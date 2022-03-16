import { Routes, Route } from "react-router-dom";
import MainNavigator from "./Components/main";
import ResultForm from "./Pages/addResult";
import "./App.css";

function App() {
  return (
    <MainNavigator>
      <Routes>
        <Route path="/" element={<ResultForm />} />
      </Routes>
    </MainNavigator>
  );
}

export default App;
