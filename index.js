/**
 * Vercel Express entry when Root Directory = repository root.
 * Vercel's build must see `express` imported in this file; deps live under `backend/`.
 * @see https://vercel.com/guides/using-express-with-vercel
 */
require("./backend/node_modules/express");
const mod = require("./backend/dist/server");
module.exports = mod.default;
