import { Route, Routes } from "react-router-dom";
import "./App.css";
import Success from "./pages/Success";
import Home from "./pages/Home";

function App() {
  

  return (
    <>
     
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success/:orderId" element={<Success />} />
      </Routes>
    </>
  );
}

export default App;
