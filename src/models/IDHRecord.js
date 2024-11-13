import { model, Schema, models } from "mongoose";
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

idhRecordSchema.index({ year: 1, idhIndex: 1, state: 1 }, { unique: true });

export default models.IDHRecord || model("IDHRecord", idhRecordSchema);
