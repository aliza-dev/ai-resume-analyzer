/**
 * Vercel Express entry when Root Directory = `backend/`.
 * Vercel's build must see `express` imported in this file (not only via dist/).
 * @see https://vercel.com/guides/using-express-with-vercel
 */
require("express");
const mod = require("./dist/server");
module.exports = mod.default;
