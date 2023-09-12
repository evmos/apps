import { readFile } from "fs/promises";
import bundleAnalyzer from "@next/bundle-analyzer";
/**
 * @type {{
 *   name:string,
 *   version?:string,
 *   devDependencies?:Record<string,string>,
 *   dependencies?:Record<string,string>,
 *   peerDependencies?:Record<string,string>,
 * }}
 **/
const modulePackageJson = JSON.parse(
  await readFile(`${process.cwd()}/package.json`, "utf-8")
);

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE_NEXT_BUNDLE === "true",
});

/** @type {(config?:import('next').NextConfig) => import('next').NextConfig} */
export function withEvmosConfig(config = {}) {
  const transpilePackages = Object.entries(
    Object.assign(
      {},
      modulePackageJson.dependencies,
      modulePackageJson.devDependencies,
      modulePackageJson.peerDependencies
    )
  ).reduce((acc, [key, value]) => {
    if (value.startsWith("workspace:")) {
      acc.add(key);
    }
    return acc;
  }, new Set());
  transpilePackages.delete("@evmos-apps/config");
  transpilePackages.delete("tailwind-config");
  transpilePackages.delete("playwright-config-custom");
  console.log(config);
  return withBundleAnalyzer({
    images: {
      domains: ["storage.evmos.org"],
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    publicRuntimeConfig: {
      version: modulePackageJson.version,
    },
    transpilePackages: [...transpilePackages],
    headers: async () => {
      return [
        {
          source: "/:path*",
          headers: [
            {
              key: "X-Content-Type-Options",
              value: "nosniff",
            },
            { key: "Access-Control-Allow-Credentials", value: "true" },
            {
              key: "Access-Control-Allow-Origin",
              value: "*",
            },
            { key: "Referrer-Policy", value: "strict-origin" },

            { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
            { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
            {
              key: "Strict-Transport-Security",
              value: "max-age=31536000; includeSubDomains; preload",
            },
            {
              key: "Content-Security-Policy",
              value:
                "font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self';",
            },
            {
              key: "Permissions-Policy",
              value: "geolocation=(), microphone=(), camera=()",
            },
            { key: "X-Frame-Options", value: "SAMEORIGIN" },
            { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
          ],
        },
        {
          source: `${config.basePath ?? ""}/manifest.json`,
          headers: [
            { key: "Access-Control-Allow-Origin", value: "*" },
            { key: "Access-Control-Allow-Methods", value: "GET" },
            {
              key: "Access-Control-Allow-Headers",
              value: "X-Requested-With, content-type, Authorization",
            },
          ],
        },
      ];
    },
    ...config,
  });
}
