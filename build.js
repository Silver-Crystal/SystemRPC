

// Define the path to your TypeScript source and output directories


const { readFileSync } =require("fs");
const { fileURLToPath } = require("url");
const esbuild = require('esbuild');
const path = require('path');

const NODE_VERSION = "20";
const srcDir = 'src';
const outDir = 'dist';

const packageJson = JSON.parse(readFileSync(path.join(__dirname, "package.json"), "utf-8"));
const packageNames = Object.keys(packageJson.dependencies);

esbuild.buildSync({
  absWorkingDir: __dirname,
  bundle: true,
  minify: false,
  format: "cjs",
  logLevel: "info",
  metafile: true,
  entryPoints: [path.join(srcDir, 'index.ts')],
  platform: "node",
  target: `node${NODE_VERSION}`,
  external: packageNames,
  outdir: outDir,
  resolveExtensions: ['.js', '.ts', '.json'],
  sourcemap: true,
});


