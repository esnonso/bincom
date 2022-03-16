const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 8080 || process.env.PORT;

const Result = require("./models/results");

app.use(cors());
app.use(bodyParser.json());

app.post("/lga", (req, res, next) => {
  const { state, lga } = req.body;
  Result.find({ state_name: state, lga_name: lga })
    .then((data) => {
      res.status(200).json({
        message: data,
      });
    })
    .catch((error) => {
      next(error);
    });
});

app.post("/polling_unit", (req, res, next) => {
  const { state, lga, polling_unit_name, polling_unit_number } = req.body;
  Result.find({
    state_name: state,
    lga_name: lga,
    polling_unit_name: polling_unit_name,
    polling_unit_number: polling_unit_number,
  })
    .then((data) => {
      res.status(200).json({
        message: data,
      });
    })
    .catch((error) => {
      next(error);
    });
});

app.post("/", (req, res, next) => {
  const {
    state_name,
    lga_name,
    polling_unit_name,
    polling_unit_number,
    ward_name,
    ward_number,
    PDP_score,
    DPP_score,
    ACN_score,
    LABOUR_score,
    PPA_score,
    CDC_score,
    JP_score,
    ANPP_score,
    CPP_score,
    entered_by_user,
  } = req.body;
  const user_ip_address = req.ip;

  const result = new Result({
    state_name,
    lga_name,
    polling_unit_name,
    polling_unit_number,
    ward_name,
    ward_number,
    PDP_score,
    DPP_score,
    ACN_score,
    LABOUR_score,
    PPA_score,
    CDC_score,
    JP_score,
    ANPP_score,
    CPP_score,
    entered_by_user,
    user_ip_address,
  });
  result
    .save()
    .then((data) => {
      res.status(200).json({
        message: "Result Succesfully Added",
      });
    })
    .catch((error) => {
      if (error.name === "MongoServerError" && error.code === 11000) {
        error.message = "Some Fields are missing";
      }
      console.log(error.code);
      next(error);
    });
});

function errorHandler(error, request, response, next) {
  return response.status(error.statusCode || 500).json({
    error: {
      message: error.message || "Couldn't complete Request Please Try Again",
    },
  });
}

app.use(errorHandler);

mongoose.connect("mongodb://localhost/bincom").then(() => {
  console.log("DATABASE CONNECTED");
  app.listen(PORT, () => console.log("SERVER IS RUNNING"));
});
