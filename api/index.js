"use strict";
/**
 * Vercel serverless entry: routes all traffic to the Express app (see root vercel.json rewrites).
 * Legacy `builds` + `routes` in vercel.json is not reliably applied on current Vercel.
 */
const mod = require("../backend/dist/server");
module.exports = mod.default;
