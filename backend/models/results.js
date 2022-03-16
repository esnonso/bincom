const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultSchema = new Schema(
  {
    lga_name: {
      type: String,
      required: true,
    },
    state_name: {
      type: String,
      required: true,
    },
    polling_unit_name: {
      type: String,
      required: true,
    },
    polling_unit_number: {
      type: String,
      required: true,
    },
    ward_name: {
      type: String,
      required: true,
    },
    ward_number: {
      type: String,
      required: true,
    },
    PDP_score: {
      type: String,
      required: true,
    },
    DPP_score: {
      type: String,
      required: true,
    },
    ACN_score: {
      type: String,
      required: true,
    },
    LABOUR_score: {
      type: String,
      required: true,
    },
    PPA_score: {
      type: String,
      required: true,
    },
    CDC_score: {
      type: String,
      required: true,
    },
    JP_score: {
      type: String,
      required: true,
    },
    ANPP_score: {
      type: String,
      required: true,
    },
    CPP_score: {
      type: String,
      required: true,
    },
    entered_by_user: {
      type: String,
      required: true,
    },
    user_ip_address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Results", resultSchema);
