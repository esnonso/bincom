import { useState, useRef } from "react";
import { Fragment } from "react";

import useApiCall from "../Hooks/httpRequest";
import states_and_lga from "./statesLga";

const PollingUnitResultForm = (props) => {
  const { sendRequest } = useApiCall();
  const [pollingUnitResultData, setPollingUnitResultData] = useState("");
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [pollingUnitName, setPollingUnitName] = useState();
  const [pollingUnitNumber, setPollingUnitNumber] = useState();
  const pollingUnitNameRef = useRef();
  const pollingUnitNumberRef = useRef();
  const [PDP_score, setPdpScore] = useState("");
  const [DPP_score, setDppScore] = useState("");
  const [ACN_score, setAcnScore] = useState("");
  const [LABOUR_score, setLabourScore] = useState("");
  const [PPA_score, setPpaScore] = useState("");
  const [CDC_score, setCdcScore] = useState("");
  const [JP_score, setJpScore] = useState("");
  const [ANPP_score, setAnppScore] = useState("");
  const [CPP_score, setCppScore] = useState("");

  const stateList = Object.keys(states_and_lga).map((key) => ({
    name: key,
  }));

  const applyData = (data) => {
    setPollingUnitResultData(data.data.message);
    data.data.message.map((data) => {
      setPdpScore(data.PDP_score);
      setDppScore(data.DPP_score);
      setAcnScore(data.ACN_score);
      setLabourScore(data.LABOUR_score);
      setPpaScore(data.PPA_score);
      setCdcScore(data.CDC_score);
      setJpScore(data.JP_score);
      setAnppScore(data.ANPP_score);
      setCppScore(data.CPP_score);
    });
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleLgaChange = (e) => {
    setLga(e.target.value);
  };

  const handleLgaResultSubmit = (e) => {
    e.preventDefault();
    setPollingUnitName(pollingUnitNameRef.current.value);
    setPollingUnitNumber(pollingUnitNumberRef.current.value);
    sendRequest(
      {
        url: "http://localhost:8080/polling_unit",
        method: "POST",
        data: {
          state,
          lga,
          polling_unit_name: pollingUnitNameRef.current.value,
          polling_unit_number: pollingUnitNumberRef.current.value,
        },
      },
      applyData
    );
  };
  return (
    <Fragment>
      {pollingUnitResultData === "" ? (
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

            <div className="form-group">
              <label>Polling Unit Name</label>
              <input
                type="text"
                id="polling_unit_name"
                name="polling_unit_name"
                ref={pollingUnitNameRef}
              />
            </div>

            <div className="form-group">
              <label>Polling Unit Number</label>
              <input
                type="text"
                id="polling_unit_number"
                name="polling_unit_number"
                ref={pollingUnitNumberRef}
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </Fragment>
      ) : (
        <div className="result-div">
          <div className="modal-header">
            <h4>
              Results for Polling Unit: {pollingUnitName}({pollingUnitNumber})
              in {lga} {state} State
            </h4>
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

export default PollingUnitResultForm;
