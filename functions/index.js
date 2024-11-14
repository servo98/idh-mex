const { onRequest } = require("firebase-functions/v2/https");

const postSeedIDH = require("./controllers/postSeedIDH");
const getIDHRecords = require("./controllers/getIDHRecords");
const editIDHRecord = require("./controllers/editIDHRecord");

// TODO: cors
exports.postSeedIDH = onRequest(
  { secrets: ["MONGO_URI"], cors: ["*"] },
  postSeedIDH
);

exports.getIDHRecords = onRequest(
  { secrets: ["MONGO_URI"], cors: ["*"] },
  getIDHRecords
);

exports.editIDHRecord = onRequest(
  { secrets: ["MONGO_URI"], cors: ["*"] },
  editIDHRecord
);
