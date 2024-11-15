const states = require("../models/states");
const connectToDB = require("../utils/mongodb");
const IDHRecord = require("../models/IDHRecord");

const postIDHYearRecord = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ msg: "Method Not Allowed. Only POST requests are allowed." });
  }

  try {
    const { records, year } = req.body;

    const newRecords = records.map((record) => {
      return {
        ...record,
        year,
      };
    });

    await connectToDB();
    const idhs = await IDHRecord.insertMany(newRecords);
    res.status(200).json({ idhRecords: idhs, states });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = postIDHYearRecord;
