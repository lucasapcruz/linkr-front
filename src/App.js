import GlobalStyled from "./GlobalStyled";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TimelinePage from "./pages/Timeline/TImelinePage";

export default function App() {

  return (
    <Router>
      <GlobalStyled/>
      <Routes>
        <Route path="/timeline" element={<TimelinePage/>}/>
      </Routes>
    </Router>
  );
}
