// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use server";
import { raise } from "helpers";
import { unstable_cache } from "next/cache";

const derive = <T>(fn: () => T) => fn();
export const getAminoName = unstable_cache(async (msgType: string) => {
  const parts = msgType.split(".");

  const messageName = parts.pop() ?? raise("Invalid message type");
  const packageName = parts.join(".") ?? raise("Invalid message type");

  const bufPackageHandle = derive(() => {
    switch (parts[0]) {
      case "evmos":
        return "evmos/evmos";
      case "cosmos":
        return "cosmos/cosmos-sdk";
      default:
        throw new Error(`Unknown buf package: ${parts[0]}`);
    }
  });

  const url = `https://buf.build/${bufPackageHandle}/descriptor/main`;

  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  }).then(
    (res) =>
      res.json() as Promise<{
        file: {
          name: string;
          package: string;
          message_type: [
            {
              name: string;
              field: [
                {
                  name: string;
                  number: number;
                  label: string;
                  type: string;
                  type_name: string;
                  json_name: string;
                },
              ];
              options: Record<`[${string}]`, unknown>;
            },
          ];
        }[];
      }>,
  );

  const message =
    res.file
      .filter((file) => file.package === packageName)
      .flatMap((file) => file.message_type)
      .find((message) => message.name === messageName) ??
    raise("Message not found");

  const aminoName = message.options[`[amino.name]`];

  if (typeof aminoName !== "string") {
    throw new Error("Amino name not found");
  }
  return aminoName;
});
