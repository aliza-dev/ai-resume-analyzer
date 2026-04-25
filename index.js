/**
 * Vercel Express entry (new Fluid / zero-config).
 * @see https://vercel.com/guides/using-express-with-vercel
 * Deploy the repo with Root Directory = repository root, or use backend/ + backend/index.js only.
 * Build must run first so `backend/dist/server` exists.
 */
const mod = require("./backend/dist/server");
module.exports = mod.default;
