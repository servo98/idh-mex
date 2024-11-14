const connectToDB = require("../utils/mongodb");
const IDHRecord = require("../models/IDHRecord");

const editIDHRecord = async (req, res) => {
  if (req.method !== "PUT") {
    return res
      .status(405)
      .json({ msg: "Method Not Allowed. Only PUT requests are allowed." });
  }

  try {
    await connectToDB();
    const edited = await IDHRecord.findByIdAndUpdate(
      req.body.id,
      {
        idhIndex: req.body.idhIndex,
      },
      { new: true }
    );
    res.status(200).json({ msg: "Record edited", idhRecord: edited });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = editIDHRecord;
