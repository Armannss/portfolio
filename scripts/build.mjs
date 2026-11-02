// Builds the site, then renders the React tree into docs/index.html so the page
// is complete before JavaScript loads and readable by crawlers.
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "vite";

await build();
await build({ build: { ssr: "src/entry-server.tsx", outDir: ".ssr", emptyOutDir: true } });

const { render } = await import(pathToFileURL(resolve(".ssr/entry-server.js")).href);
const page = resolve("docs/index.html");
writeFileSync(page, readFileSync(page, "utf8").replace("<!--app-->", render()));
rmSync(".ssr", { recursive: true });
