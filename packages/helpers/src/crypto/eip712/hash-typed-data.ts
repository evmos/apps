// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { type Hex, concat, encodeAbiParameters, keccak256, toHex } from "viem";
import { get } from "lodash-es";
import type { AbiParameter } from "abitype";
import { assertIf, raise } from "helpers";
import { EvmosTypedData } from "./types";

function hashDomain({
  domain,
  types,
}: {
  domain: Record<string, unknown>;
  types: Record<
    string,
    {
      name: string;
      type: string;
    }[]
  >;
}) {
  return hashStruct({
    data: domain,
    primaryType: "EIP712Domain",
    types,
  });
}

function hashStruct({
  data,
  primaryType,
  types,
}: {
  data: Record<string, unknown>;
  primaryType: string;
  types: Record<
    string,
    {
      name: string;
      type: string;
    }[]
  >;
}) {
  const encoded = encodeData({
    data,
    primaryType,
    types,
  });
  return keccak256(encoded);
}

function encodeData({
  data,
  primaryType,
  types,
}: {
  data: Record<string, unknown>;
  primaryType: string;
  types: Record<
    string,
    {
      name: string;
      type: string;
    }[]
  >;
}) {
  const encodedTypes: AbiParameter[] = [{ type: "bytes32" }];
  const encodedValues: unknown[] = [hashType({ primaryType, types })];
  const fields = types[primaryType];
  if (Array.isArray(fields) === false) {
    throw new Error(`No type definition specified: ${primaryType}`);
  }

  for (const field of fields) {
    const name: unknown = get(field, "name");
    const type: unknown = get(field, "type");
    assertIf(typeof name === "string", "Field name is not a string");
    assertIf(typeof type === "string", "Field type is not a string");
    const [encodedType, encodedValue] = encodeField({
      types,
      name,
      type,
      value: data[name],
    });
    encodedTypes.push(encodedType);
    encodedValues.push(encodedValue);
  }

  return encodeAbiParameters(encodedTypes, encodedValues);
}

function hashType({
  primaryType,
  types,
}: {
  primaryType: string;
  types: Record<
    string,
    {
      name: string;
      type: string;
    }[]
  >;
}) {
  const encodedHashType = toHex(encodeType({ primaryType, types }));
  return keccak256(encodedHashType);
}

function encodeType({
  primaryType,
  types,
}: {
  primaryType: string;
  types: Record<
    string,
    {
      name: string;
      type: string;
    }[]
  >;
}) {
  let result = "";
  const unsortedDeps = findTypeDependencies({ primaryType, types });
  unsortedDeps.delete(primaryType);

  const deps = [primaryType, ...Array.from(unsortedDeps).sort()];
  for (const type of deps) {
    result += `${type}(${(
      types[type] ?? raise(`No type definition specified: ${type}`)
    )
      .map(({ name, type: t }) => `${t} ${name}`)
      .join(",")})`;
  }

  return result;
}

function findTypeDependencies(
  {
    primaryType: primaryType_,
    types,
  }: {
    primaryType: string;
    types: Record<
      string,
      {
        name: string;
        type: string;
      }[]
    >;
  },
  results: Set<string> = new Set()
): Set<string> {
  const match = primaryType_.match(/^\w*/u);
  const primaryType = match?.[0] ?? raise("Invalid primary type");
  if (results.has(primaryType) || types[primaryType] === undefined) {
    return results;
  }

  results.add(primaryType);
  const fields = types[primaryType] ?? raise("No type definition");

  for (const field of fields) {
    findTypeDependencies({ primaryType: field.type, types }, results);
  }
  return results;
}

function encodeField({
  types,
  name,
  type,
  value,
}: {
  types: Record<
    string,
    {
      name: string;
      type: string;
    }[]
  >;
  name: string;
  type: string;
  value: unknown;
}): [type: AbiParameter, value: unknown] {
  if (types[type] !== undefined) {
    assertIf(
      typeof value === "object" && value !== null,
      "Invalid value for type"
    );
    return [
      { type: "bytes32" },
      keccak256(
        encodeData({
          data: value as Record<string, unknown>,
          primaryType: type,
          types,
        })
      ),
    ];
  }

  if (type === "bytes") {
    assertIf(typeof value === "string", "Invalid bytes value");
    const prepend = value.length % 2 ? "0" : "";
    return [{ type: "bytes32" }, keccak256(`0x${prepend + value.slice(2)}`)];
  }

  if (type === "string") {
    assertIf(typeof value === "string", "Invalid string value");
    return [{ type: "bytes32" }, keccak256(toHex(value))];
  }

  if (type.lastIndexOf("]") === type.length - 1) {
    const parsedType = type.slice(0, type.lastIndexOf("["));
    const typeValuePairs = (value as [AbiParameter, unknown][]).map((item) =>
      encodeField({
        name,
        type: parsedType,
        types,
        value: item,
      })
    );
    return [
      { type: "bytes32" },
      keccak256(
        encodeAbiParameters(
          typeValuePairs.map(([t]) => t),
          typeValuePairs.map(([, v]) => v)
        )
      ),
    ];
  }

  return [{ type }, value];
}

export const hashTypedData = ({
  domain,
  message,
  primaryType,
  types,
}: EvmosTypedData) => {
  const parts: Hex[] = ["0x1901"];

  if (domain)
    parts.push(
      hashDomain({
        domain,
        types,
      })
    );
  if (primaryType !== "EIP712Domain") {
    parts.push(
      hashStruct({
        data: message,
        primaryType,
        types,
      })
    );
  }
  return keccak256(concat(parts));
};
