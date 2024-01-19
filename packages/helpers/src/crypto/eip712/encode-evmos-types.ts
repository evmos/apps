// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { isUndefined } from "helpers";
import { get } from "lodash-es";

/**
 * This is a port of the core logic from evmos to encode EIP-712 types.
 * https://github.com/evmos/evmos/blob/main/ethereum/eip712/types.go
 */
type Eip712Type = {
  name: string;
  type: string;
};

type Eip712Types = Record<string, Eip712Type[]>;

type Msg = {
  type: string;
  value: Record<string, unknown>;
};

const rootPrefix = "_" as const;
const typePrefix = "Type" as const;
const txField = "Tx" as const;

const maxDuplicateTypeDefs = 1000;

const sortKeys = <T extends Record<string, unknown>>(obj: T): T =>
  Object.keys(obj)
    .sort()
    .reduce(
      (acc, key) => {
        acc[key] = obj[key];
        return acc;
      },
      {} as Record<string, unknown>
    ) as T;

export const encodeEvmosEIP712Types = (messagePayload: Msg[]) => {
  const eip712Types: Eip712Types = {
    EIP712Domain: [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "string" },
      { name: "salt", type: "string" },
    ],
    Tx: [
      { name: "account_number", type: "string" },
      { name: "chain_id", type: "string" },
      { name: "fee", type: "Fee" },
      { name: "memo", type: "string" },
      { name: "sequence", type: "string" },
      // Note timeout_height was removed because it was not getting filled with the legacyTx
    ],
    Fee: [
      { name: "amount", type: "Coin[]" },
      { name: "gas", type: "string" },
    ],
    Coin: [
      { name: "denom", type: "string" },
      { name: "amount", type: "string" },
    ],
  };

  for (let i = 0; i < messagePayload.length; i++) {
    const field = `msg${i}`;

    const msg = messagePayload[i]!;

    addMsgTypesToRoot(eip712Types, field, msg);
  }

  return sortKeys(eip712Types);
};

const addMsgTypesToRoot = (
  eip712Types: Eip712Types,
  msgField: string,
  msg: Msg
) => {
  const msgRootType = getMsgRootType(msg);

  const msgTypeDef = recursivelyAddTypesToRoot(
    eip712Types,
    msgRootType,
    rootPrefix,
    msg
  );

  addMsgTypeDefToTxSchema(eip712Types, msgField, msgTypeDef);
};

const getMsgRootType = (msg: Msg) => {
  const msgType = msg.type;
  if (msgType === "") {
    throw new Error("malformed message type value, expected type string");
  }
  const typeTokenized = msgType.split("/");
  const msgSignature = typeTokenized[typeTokenized.length - 1];
  const rootType = `${typePrefix}${msgSignature}`;
  return rootType;
};

const addMsgTypeDefToTxSchema = (
  eip712Types: Eip712Types,
  msgField: string,
  msgTypeDef: string
) => {
  get(eip712Types, txField)?.push({ name: msgField, type: msgTypeDef });
};

const recursivelyAddTypesToRoot = (
  typeMap: Eip712Types,
  rootType: string,
  prefix: string,
  payload: Record<string, unknown>
) => {
  const sortedFieldNames = Object.keys(payload).sort((a, b) =>
    a <= b ? 1 : -1
  );

  const typesToAdd: Eip712Type[] = [];
  const typeDef = typeDefForPrefix(prefix, rootType);

  for (const fieldName of sortedFieldNames) {
    let field = get(payload, fieldName);
    if (isUndefined(field)) {
      continue;
    }
    // Handle array type by unwrapping the first element.
    // Note that arrays with multiple types are not supported
    // using EIP-712, so we can ignore that case.
    let isCollection = false;
    if (Array.isArray(field)) {
      if (field.length === 0) {
        // Arbitrarily add string[] type to handle empty arrays,
        // since we cannot access the underlying object.
        const emptyArrayType = "string[]";
        typesToAdd.push({ name: fieldName, type: emptyArrayType });
        continue;
      }
      field = field[0]!;
      isCollection = true;
    }

    const ethType = getEthTypeForJSON(field);

    // Handle JSON primitive types by adding the corresponding
    // EIP-712 type to the types schema.
    if (ethType !== null) {
      if (isCollection) {
        typesToAdd.push({ name: fieldName, type: `${ethType}[]` });
      } else {
        typesToAdd.push({ name: fieldName, type: ethType });
      }
      continue;
    }

    if (typeof field === "object" && field !== null) {
      const fieldPrefix = prefixForSubField(prefix, fieldName);
      const fieldTypeDef = recursivelyAddTypesToRoot(
        typeMap,
        rootType,
        fieldPrefix,
        field as Record<string, unknown>
      );

      let typeDef = sanitizeTypedef(fieldTypeDef);
      if (isCollection) {
        typeDef += "[]";
      }

      typesToAdd.push({ name: fieldName, type: typeDef });
      continue;
    }
  }

  return addTypesToRoot(typeMap, typeDef, typesToAdd);
};

const typeDefForPrefix = (prefix: string, rootType: string) => {
  if (prefix === rootPrefix) {
    return rootType;
  }
  return sanitizeTypedef(prefix);
};

const prefixForSubField = (prefix: string, fieldName: string) =>
  `${prefix}.${fieldName}`;

const addTypesToRoot = (
  typeMap: Eip712Types,
  typeDef: string,
  types: Eip712Type[]
) => {
  let indexedTypeDef = typeDef;

  let indexAsDuplicate = 0;

  while (true) {
    indexedTypeDef = typeDefWithIndex(typeDef, indexAsDuplicate);
    const existingTypes = typeMap[indexedTypeDef];

    // Found identical duplicate, so we can simply return
    // the existing type definition.
    if (existingTypes && typesAreEqual(types, existingTypes)) {
      return indexedTypeDef;
    }

    // Found no element, so we can create a new one at this index.
    if (!existingTypes) {
      break;
    }

    indexAsDuplicate++;

    if (indexAsDuplicate === maxDuplicateTypeDefs) {
      throw new Error(
        "exceeded maximum number of duplicates for a single type definition"
      );
    }
  }

  typeMap[indexedTypeDef] = types;

  return indexedTypeDef;
};

const typeDefWithIndex = (typeDef: string, index: number) =>
  `${typeDef}${index}`;

const typesAreEqual = (
  types1: Readonly<Eip712Type[]>,
  types2: Readonly<Eip712Type[]>
) => {
  if (types1.length !== types2.length) {
    return false;
  }

  for (let i = 0; i < types1.length; i++) {
    const a = types1[i]!;
    const b = types2[i]!;
    if (a.name !== b.name || a.type !== b.type) {
      return false;
    }
  }

  return true;
};

const sanitizeTypedef = (str: string) => {
  const caser = (str: string) => str[0]!.toUpperCase() + str.slice(1);
  const parts = str.split(".");
  const buf = parts
    .map((part) => {
      if (part === rootPrefix) {
        return typePrefix;
      }
      return part.split("_").map(caser).join("");
    })
    .join("");
  return buf;
};

const getEthTypeForJSON = (json: unknown) => {
  switch (typeof json) {
    case "boolean":
      return "bool" as const;
    case "number":
      return "int64" as const;
    case "string":
      return "string" as const;
    default:
      // Array or Object type
      return null;
  }
};
