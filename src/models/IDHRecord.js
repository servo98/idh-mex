import { model, Schema } from "mongoose";
import states from "@/data/states";

const idhRecordSchema = new Schema({
  state: {
    type: String,
    required: true,
    enum: states,
  },
  year: {
    type: Number,
    required: true,
  },
  idhIndex: {
    type: Number,
    required: true,
  },
});

export default model("IDHRecord", idhRecordSchema);
