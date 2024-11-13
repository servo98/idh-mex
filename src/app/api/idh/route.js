import connectToDB from "@/libs/mongodb";
import responseHelper from "@/app/utils/responseHelper";
import IDHRecord from "@/models/IDHRecord";
import states from "@/data/states";

const GET = async () => {
  try {
    // TODO: filter data
    await connectToDB();
    const idhs = await IDHRecord.find();
    return responseHelper({
      idhRecords: idhs,
      states,
    });
  } catch (error) {
    return responseHelper(
      {
        msg: "Error getting idhs",
        error,
      },
      500
    );
  }
};
const POST = () => {
  return new Response("Esto es post");
};
const PUT = () => {
  return new Response("Esto es put");
};
const DELETE = () => {
  return new Response("Esto es delete");
};

export { DELETE, GET, POST, PUT };
