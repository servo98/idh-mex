const states = require("../models/states");
const connectToDB = require("../utils/mongodb");
const IDHRecord = require("../models/IDHRecord");

const getIDHRecords = async (req, res) => {
  try {
    await connectToDB();
    const idhs = await IDHRecord.find();
    res.status(200).json({ idhRecords: idhs, states });
  } catch (error) {
    console.error("Error during seeding:", error);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = getIDHRecords;
