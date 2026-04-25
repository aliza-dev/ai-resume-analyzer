/**
 * Vercel Express entry when Root Directory = `backend/`.
 * `api/index.js` is NOT a valid path for the current Express on Vercel model.
 * @see https://vercel.com/guides/using-express-with-vercel
 */
const mod = require("./dist/server");
module.exports = mod.default;
