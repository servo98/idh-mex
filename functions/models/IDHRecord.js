const { Schema, model, models } = require("mongoose");
const states = require("./states");

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

// Exporta el modelo usando module.exports
module.exports = models.IDHRecord || model("IDHRecord", idhRecordSchema);
