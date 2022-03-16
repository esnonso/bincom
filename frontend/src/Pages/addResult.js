import { useState, useRef } from "react";

import useApiCall from "../Hooks/httpRequest";
import states_and_lga from "../Components/statesLga";

const ResultForm = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const { error, sendRequest } = useApiCall();
  const pollingUnitNameRef = useRef();
  const pollingUnitNumberRef = useRef();
  const wardNameRef = useRef();
  const wardNumberRef = useRef();
  const PDPRef = useRef();
  const DPPRef = useRef();
  const ACNRef = useRef();
  const LABOURRef = useRef();
  const PPARef = useRef();
  const CDCRef = useRef();
  const JPRef = useRef();
  const ANPPRef = useRef();
  const CPPRef = useRef();
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");

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
    setSuccessMessage(data.data.message);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    setSuccessMessage("");
    sendRequest(
      {
        url: "http://localhost:8080",
        method: "POST",
        data: {
          state_name: state,
          lga_name: lga,
          polling_unit_name: pollingUnitNameRef.current.value,
          polling_unit_number: pollingUnitNumberRef.current.value,
          ward_name: wardNameRef.current.value,
          ward_number: wardNumberRef.current.value,
          PDP_score: PDPRef.current.value,
          DPP_score: DPPRef.current.value,
          ACN_score: ACNRef.current.value,
          LABOUR_score: LABOURRef.current.value,
          PPA_score: PPARef.current.value,
          CDC_score: CDCRef.current.value,
          JP_score: JPRef.current.value,
          ANPP_score: ANPPRef.current.value,
          CPP_score: CPPRef.current.value,
          entered_by_user: "User.name",
        },
      },
      applyData
    );
    setLga("");
    setState("");
    pollingUnitNameRef.current.value = "";
    pollingUnitNumberRef.current.value = "";
    wardNameRef.current.value = "";
    wardNumberRef.current.value = "";
    PDPRef.current.value = "";
    DPPRef.current.value = "";
    ACNRef.current.value = "";
    LABOURRef.current.value = "";
    PPARef.current.value = "";
    CDCRef.current.value = "";
    JPRef.current.value = "";
    ANPPRef.current.value = "";
    CPPRef.current.value = "";
  };

  return (
    <form onSubmit={submitHandler}>
      <h1>ELECTION RESULT FORM</h1>

      {successMessage && <p className="success">{successMessage}</p>}
      {error && <small className="error">{error}</small>}

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

      <div className="form-group">
        <label>Ward Name</label>
        <input type="text" id="ward_name" name="ward_name" ref={wardNameRef} />
      </div>

      <div className="form-group">
        <label>Ward Number</label>
        <input
          type="number"
          id="ward_number"
          name="ward_number"
          ref={wardNumberRef}
        />
      </div>

      <div className="form-group">
        <label>PDP Number of Votes</label>
        <input type="number" id="pdp" name="pdp" ref={PDPRef} />
      </div>

      <div className="form-group">
        <label>DPP Number of Votes</label>
        <input type="number" id="dpp" name="dpp" ref={DPPRef} />
      </div>

      <div className="form-group">
        <label>ACN Number of Votes</label>
        <input type="number" id="acn" name="acn" ref={ACNRef} />
      </div>

      <div className="form-group">
        <label>LABOUR Number of Votes</label>
        <input type="number" id="labour" name="labour" ref={LABOURRef} />
      </div>

      <div className="form-group">
        <label>PPA Number of Votes</label>
        <input type="number" id="ppa" name="ppa" ref={PPARef} />
      </div>

      <div className="form-group">
        <label>CDC Number of Votes</label>
        <input type="number" id="cdc" name="cdc" ref={CDCRef} />
      </div>

      <div className="form-group">
        <label>JP Number of Votes</label>
        <input type="number" id="jp" name="jp" ref={JPRef} />
      </div>

      <div className="form-group">
        <label>ANPP Number of Votes</label>
        <input type="number" id="anpp" name="anpp" ref={ANPPRef} />
      </div>

      <div className="form-group">
        <label>CPP Number of Votes</label>
        <input type="number" id="cpp" name="cpp" ref={CPPRef} />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ResultForm;
