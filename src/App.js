import "./App.css";
import Header from "./components/Header";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard, Detail } from "./pages";

function App() {
  return (
    <Router>
      <div className="app-container bg-light">
        <Header />
        <Routes>
          <Route exact path="/detail/:id" element={<Detail />} />
          <Route exact path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
