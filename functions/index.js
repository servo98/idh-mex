const { onRequest } = require("firebase-functions/v2/https");

const postSeedIDH = require("./controllers/postSeedIDH");
const getIDHRecords = require("./controllers/getIDHRecords");
const editIDHRecord = require("./controllers/editIDHRecord");
const postIDHYearRecord = require("./controllers/postIDHYearRecord");

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

exports.postIDHYearRecord = onRequest(
  { secrets: ["MONGO_URI"], cors: ["*"] },
  postIDHYearRecord
);
