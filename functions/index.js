const { onRequest } = require("firebase-functions/v2/https");

const postSeedIDH = require("./controllers/postSeedIDH");
const getIDHRecords = require("./controllers/getIDHRecords");

exports.postSeedIDH = onRequest({ secrets: ["MONGO_URI"] }, postSeedIDH);
exports.getIDHRecords = onRequest({ secrets: ["MONGO_URI"] }, getIDHRecords);
