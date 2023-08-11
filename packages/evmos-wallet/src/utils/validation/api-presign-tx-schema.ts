import { z } from "zod";
import { TypedDataSchema } from "./typed-data-schema";
import Long from "long";
import { LegacyAminoSchema } from "./legacy-amino-schema";

const base64ToBytes = (data: string) =>
  new Uint8Array(Buffer.from(data, "base64"));

const SignBodySchema = z.object({
  body: z.string().transform(base64ToBytes),
  authInfo: z.string().transform(base64ToBytes),
  signBytes: z.string().transform(base64ToBytes),
});

export const ApiPresignTxSchema = z
  .object({
    eipToSign: z
      .string()
      .transform((data) =>
        data
          ? (JSON.parse(
              Buffer.from(data, "base64").toString("utf-8")
            ) as unknown)
          : null
      )
      .pipe(z.union([z.null(), TypedDataSchema])),
    legacyAmino: SignBodySchema,
    signDirect: SignBodySchema,
    accountNumber: z.string().transform((data) => Long.fromString(data)),
    chainId: z.string(),
    explorerTxUrl: z.string().optional(),
    dataSigningAmino: z
      .string()
      .transform((data) => JSON.parse(data) as unknown)
      .pipe(LegacyAminoSchema),
  })
  .transform((data) => {
    return {
      chainId: data.chainId,
      accountNumber: data.accountNumber,
      typedData: data.eipToSign,

      directSignDoc: {
        bodyBytes: data.signDirect.body,
        authInfoBytes: data.signDirect.authInfo,
        chainId: data.chainId,
        accountNumber: data.accountNumber,
      },
      aminoSignDoc: data.dataSigningAmino,
      legacyAmino: data.legacyAmino,
      explorerTxUrl: data.explorerTxUrl,
    };
  });

export type ApiPresignTx = z.infer<typeof ApiPresignTxSchema>;
