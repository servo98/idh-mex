const { onRequest } = require("firebase-functions/v2/https");

const postSeedIDH = require("./controllers/postSeedIDH");
const getIDHRecords = require("./controllers/getIDHRecords");

// TODO: cors
exports.postSeedIDH = onRequest(
  { secrets: ["MONGO_URI"], cors: ["*"] },
  postSeedIDH
);
exports.getIDHRecords = onRequest(
  { secrets: ["MONGO_URI"], cors: ["*"] },
  getIDHRecords
);
