// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { compile } from "json-schema-to-typescript";
import { writeFile, rm, mkdir } from "fs/promises";

import kebabCase from "lodash-es/kebabCase.js";
import path from "path";
import { autogenDir } from "./constants";
import get from "lodash-es/get.js";

await mkdir(autogenDir, { recursive: true });

const genTypes = async (
  schemaUrl: string,
  entityName: string,
  mapSchema = (schema: Record<string, unknown>) => schema,
) => {
  const schema = mapSchema(
    (await fetch(schemaUrl).then((res) => res.json())) as Record<
      string,
      unknown
    >,
  );
  // delete $id to force the type to be named as entityName
  delete schema.$id;

  const types = await compile(schema, entityName, {
    additionalProperties: false,
  });

  await writeFile(path.join(autogenDir, kebabCase(entityName) + ".ts"), types);
};

await rm(autogenDir, { recursive: true, force: true });
await mkdir(autogenDir, { recursive: true });

await Promise.all([
  genTypes(
    "https://raw.githubusercontent.com/evmos/chain-token-registry/main/schema.token.json",
    "TokenEntity",
  ),
  genTypes(
    "https://raw.githubusercontent.com/evmos/chain-token-registry/main/schema.chain.json",
    "ChainEntity",
    (schema) => {
      // While in the regitry, it doesn't make sense to have localnet as a configuration type,
      // it does make sense here for development purposes.
      // So we inject this option before generating the types
      const configurationTypes = get(
        schema,
        "properties.configurations.items.properties.configurationType.enum",
      ) as string[];

      configurationTypes.push("localnet");

      return schema;
    },
  ),
]);
