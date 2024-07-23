// Define the path to your TypeScript source and output directories

const { readFileSync } = require("fs");
const { createContext } = require("@marshift/argus");
const esbuild = require("esbuild");
const path = require("path");

const ctx = createContext(process.argv);
const watch = ctx.hasOptionalArg(/--watch/);

const NODE_VERSION = "20";
const srcDir = "src";
const outDir = "dist";

const packageJson = JSON.parse(readFileSync(path.join(__dirname, "package.json"), "utf-8"));
const packageNames = Object.keys(packageJson.dependencies);

esbuild
  .context({
    absWorkingDir: __dirname,
    bundle: true,
    minify: true,
    format: "cjs",
    logLevel: "info",
    metafile: true,
    entryPoints: [path.join(srcDir, "index.ts")],
    platform: "node",
    target: `node${NODE_VERSION}`,
    external: packageNames,
    outdir: outDir,
    resolveExtensions: [".js", ".ts", ".json"],
    sourcemap: true,
  })
  .then((context) => {
    if (watch) {
      context.watch();
      return;
    }

    context.rebuild();
    return context;
  })
  .then((context) => context?.dispose?.());
