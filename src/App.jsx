import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LiveCurrency from "./pages/LiveCurrency";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";

import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/live-currency" element={<LiveCurrency />} />
          <Route path="/" element={<Error />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
