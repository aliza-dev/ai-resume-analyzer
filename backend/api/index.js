"use strict";
/**
 * Vercel serverless entry when the Vercel project "Root Directory" is `backend/`.
 * Rewrites in backend/vercel.json send all paths here.
 */
const mod = require("../dist/server");
module.exports = mod.default;
