const IDHRecord = require("../models/IDHRecord");
const connectToDB = require("../utils/mongodb");
const states = require("../models/states");

const generateRandomIDH = () => Math.random().toFixed(3);

const generateConsecutiveYears = () => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - Math.floor(Math.random() * 6) - 5;
  return Array.from({ length: 5 }, (_, i) => startYear + i);
};

const seedIDHRecords = async () => {
  await connectToDB();
  const years = generateConsecutiveYears();

  const records = years.flatMap((year) =>
    states.map((state) => ({
      year: year,
      idhIndex: generateRandomIDH(),
      state,
    }))
  );

  try {
    await IDHRecord.deleteMany({});
    await IDHRecord.insertMany(records);
    return "Seeding completed";
  } catch (error) {
    // console.error("Error with seeder", error);
    throw new Error("Error during seeding");
  }
};

const postSeedIDH = async (req, res) => {
  try {
    const result = await seedIDHRecords();
    res.status(200).json({ msg: result });
  } catch (error) {
    // console.error("Error during seeding:", error);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = postSeedIDH;
