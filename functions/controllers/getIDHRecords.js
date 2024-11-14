const states = require("../models/states");
const connectToDB = require("../utils/mongodb");
const IDHRecord = require("../models/IDHRecord");

const getIDHRecords = async (req, res) => {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ msg: "Method Not Allowed. Only GET requests are allowed." });
  }

  try {
    await connectToDB();
    const idhs = await IDHRecord.find();
    res.status(200).json({ idhRecords: idhs, states });
  } catch (error) {
    // console.error("Error during seeding:", error);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = getIDHRecords;
