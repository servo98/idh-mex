const { onRequest } = require("firebase-functions/v2/https");

const postSeedIDH = require("./controllers/postSeedIDH");
const getIDHRecords = require("./controllers/getIDHRecords");

exports.postSeedIDH = onRequest(postSeedIDH);
exports.getIDHRecords = onRequest(getIDHRecords);
