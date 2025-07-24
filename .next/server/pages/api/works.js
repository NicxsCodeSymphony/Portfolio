const CHUNK_PUBLIC_PATH = "server/pages/api/works.js";
const runtime = require("../../chunks/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/node_modules_e80426d8._.js");
runtime.loadChunk("server/chunks/[root-of-the-server]__e191530e._.js");
runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/pages-api.js { INNER_PAGE => \"[project]/pages/api/works.ts [api] (ecmascript)\" } [api] (ecmascript)", CHUNK_PUBLIC_PATH);
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/pages-api.js { INNER_PAGE => \"[project]/pages/api/works.ts [api] (ecmascript)\" } [api] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
