import { useState } from "react";
import LgaResultForm from "./lgaResultForm";

import Modal from "../Modal/Modal";
import PollingUnitResultForm from "./pollingUnitResultForm";

const MainNavigator = (props) => {
  const [lgaResultForm, setLgaResultForm] = useState(false);
  const [pollingUnitResultForm, setPollingUnitResultForm] = useState(false);

  const showLgaResultForm = () => {
    setLgaResultForm(true);
  };

  const hideLgaResultForm = () => {
    setLgaResultForm(false);
  };

  const showPollingUnitResultForm = () => {
    setPollingUnitResultForm(true);
  };

  const hidePollingUnitResultForm = () => {
    setPollingUnitResultForm(false);
  };

  return (
    <div className="App">
      <header>
        <nav>
          <button onClick={showPollingUnitResultForm}>
            View Polling Unit Result
          </button>
        </nav>
        <nav>
          <button onClick={showLgaResultForm}>View LGA Result</button>
        </nav>
      </header>
      <div>{props.children}</div>

      {lgaResultForm && (
        <Modal onClose={hideLgaResultForm}>
          <LgaResultForm onClose={hideLgaResultForm} />
        </Modal>
      )}

      {pollingUnitResultForm && (
        <Modal onClose={hidePollingUnitResultForm}>
          <PollingUnitResultForm onClose={hidePollingUnitResultForm} />
        </Modal>
      )}
    </div>
  );
};

export default MainNavigator;
