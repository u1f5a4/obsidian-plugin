import esbuild from "esbuild"
import { sassPlugin } from "esbuild-sass-plugin"
import path from "path"
import process from "process"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const isProduction = process.argv[2] === "production"

const inputRoot = path.resolve(__dirname, "src", "app")
const entryFile = path.join(inputRoot, "main.ts")
const outputRoot = path.resolve(__dirname, "dist")
const outputFile = path.join(outputRoot, "main.js")

const context = await esbuild.context({
  entryPoints: [entryFile],
  outfile: outputFile,
  bundle: true,
  treeShaking: true,
  format: "cjs",
  target: "es2020",
  logLevel: "info",
  minify: isProduction ? true : false,
  sourcemap: isProduction ? false : "inline",
  define: {
    "process.env.NODE_ENV": isProduction ? "\"production\"" : "\"development\"",
  },
  plugins: [sassPlugin()],
  external: [
    "obsidian",
    "electron",
    "@codemirror/autocomplete",
    "@codemirror/collab",
    "@codemirror/commands",
    "@codemirror/language",
    "@codemirror/lint",
    "@codemirror/search",
    "@codemirror/state",
    "@codemirror/view",
    "@lezer/common",
    "@lezer/highlight",
    "@lezer/lr",
    ...getBuiltins(),
  ],
})

if (isProduction) {
  await context.rebuild()
  process.exit(0)
} else {
  await context.watch()
}

function getBuiltins() {
  return [
    "assert",
    "assert/strict",
    "async_hooks",
    "buffer",
    "child_process",
    "cluster",
    "console",
    "constants",
    "crypto",
    "dgram",
    "diagnostics_channel",
    "dns",
    "dns/promises",
    "domain",
    "events",
    "fs",
    "fs/promises",
    "http",
    "http2",
    "https",
    "inspector",
    "inspector/promises",
    "module",
    "net",
    "os",
    "path",
    "path/posix",
    "path/win32",
    "perf_hooks",
    "process",
    "punycode",
    "querystring",
    "readline",
    "readline/promises",
    "repl",
    "stream",
    "stream/consumers",
    "stream/promises",
    "stream/web",
    "string_decoder",
    "timers",
    "timers/promises",
    "tls",
    "trace_events",
    "tty",
    "url",
    "util",
    "util/types",
    "v8",
    "vm",
    "wasi",
    "worker_threads",
    "zlib",
  ]
}
