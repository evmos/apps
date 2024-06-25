// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import "server-only";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth-options";

/**
 * Get user session in the server
 * @see {@link https://next-auth.js.org/configuration/nextjs#getserversession|getServerSession}.
 *
 * For client side usage you can use next-auth's `getSession` and `useSession`
 * @see {@link https://next-auth.js.org/getting-started/client#getsession|getSession}
 * @see {@link https://next-auth.js.org/getting-started/client#usesession|useSession}
 *
 *
 * @example
 * get session in server components
 * ```tsx
 * export default async function Page() {
 *   const session = await getUserSession()
 *   return <pre>{JSON.stringify(session, null, 2)}</pre>
 * }
 * ```
 *
 * @example
 * get session in api requests
 * ```tsx
 * export default async function handler(req, res) {
 *   const session = await getUserSession(req, res)
 *
 *   if (!session) {
 *     res.status(401).json({ message: "You must be logged in." })
 *     return
 *   }
 *
 *   return res.json({
 *     message: "Success",
 *   })
 * }
 * ```
 */
export function getUserSession(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
