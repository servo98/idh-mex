import responseHelper from "@/app/utils/responseHelper";
import connectToDB from "@/libs/mongodb";
import IDHRecord from "@/models/IDHRecord";
import states from "@/data/states";

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
    console.error("Error with seeder", error);
    throw new Error("Error during seeding");
  }
};

const POST = async () => {
  try {
    const result = await seedIDHRecords();
    return responseHelper({ msg: result });
  } catch (error) {
    return responseHelper({ msg: error.message }, 500);
  }
};

export { POST };
