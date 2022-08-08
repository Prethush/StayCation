import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OtpVerification from "./pages/OtpVerification";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/verifyUser/:id" element={<OtpVerification />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
