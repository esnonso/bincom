import { useState } from "react";
import { Fragment } from "react";

import states_and_lga from "./statesLga";
import useApiCall from "../Hooks/httpRequest";

const LgaResultForm = (props) => {
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [lgaResultData, setLgaResultData] = useState("");
  const { sendRequest } = useApiCall();
  const [PDP_score, setPdpScore] = useState(0);
  const [DPP_score, setDppScore] = useState(0);
  const [ACN_score, setAcnScore] = useState(0);
  const [LABOUR_score, setLabourScore] = useState(0);
  const [PPA_score, setPpaScore] = useState(0);
  const [CDC_score, setCdcScore] = useState(0);
  const [JP_score, setJpScore] = useState(0);
  const [ANPP_score, setAnppScore] = useState(0);
  const [CPP_score, setCppScore] = useState(0);

  const stateList = Object.keys(states_and_lga).map((key) => ({
    name: key,
  }));

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleLgaChange = (e) => {
    setLga(e.target.value);
  };

  const applyData = (data) => {
    setLgaResultData(data.data.message);
    data.data.message.map((data) => {
      setPdpScore((prevState) => prevState + +data.PDP_score);
      setDppScore((prevState) => prevState + +data.DPP_score);
      setAcnScore((prevState) => prevState + +data.ACN_score);
      setLabourScore((prevState) => prevState + +data.LABOUR_score);
      setPpaScore((prevState) => prevState + +data.PPA_score);
      setCdcScore((prevState) => prevState + +data.CDC_score);
      setJpScore((prevState) => prevState + +data.JP_score);
      setAnppScore((prevState) => prevState + +data.ANPP_score);
      setCppScore((prevState) => prevState + +data.CPP_score);
    });
  };

  const handleLgaResultSubmit = (e) => {
    e.preventDefault();
    sendRequest(
      {
        url: "http://localhost:8080/lga",
        method: "POST",
        data: {
          state,
          lga,
        },
      },
      applyData
    );
  };

  return (
    <Fragment>
      {lgaResultData === "" ? (
        <Fragment>
          <div className="modal-header">
            <h4>LGA RESULT FORM </h4>
            <span className="close-button" onClick={props.onClose}>
              x
            </span>
          </div>
          <form onSubmit={handleLgaResultSubmit}>
            <div className="form-group">
              <label>State</label>
              <select
                name="states_of_nigeria"
                id="states_of_nigeria"
                onChange={handleStateChange}
                value={state}
              >
                <option value="">Select state</option>
                {stateList.map((state, key) => (
                  <option key={key} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Local Government</label>
              <select value={lga} onChange={handleLgaChange}>
                <option>Select LGA</option>
                {state !== ""
                  ? states_and_lga[state].map((lga, key) => (
                      <option key={key} value={lga}>
                        {lga}
                      </option>
                    ))
                  : ""}
              </select>
            </div>

            <button type="submit">Submit</button>
          </form>
        </Fragment>
      ) : (
        <div className="result-div">
          <div className="modal-header">
            <h4>Result for {lga} Local Goverment Area</h4>
            <span className="close-button" onClick={props.onClose}>
              x
            </span>
          </div>
          <p>
            <span className="party-list">PDP :</span> {PDP_score}
          </p>
          <p>
            <span className="party-list">DPP :</span> {DPP_score}
          </p>
          <p>
            <span className="party-list">ACN :</span> {ACN_score}
          </p>
          <p>
            <span className="party-list">LABOUR :</span> {LABOUR_score}
          </p>
          <p>
            <span className="party-list">PPA :</span> {PPA_score}
          </p>
          <p>
            <span className="party-list">CDC :</span> {CDC_score}
          </p>
          <p>
            <span className="party-list">JP :</span> {JP_score}
          </p>
          <p>
            <span className="party-list">ANPP :</span> {ANPP_score}
          </p>
          <p>
            <span className="party-list">CPP :</span> {CPP_score}
          </p>
        </div>
      )}
    </Fragment>
  );
};

export default LgaResultForm;
