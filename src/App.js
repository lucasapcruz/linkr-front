import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./assets/css/globalStyles";
import UserStyles from "./assets/css/userStyles";
import Home from "./pages/home/home";
import SignIn from "./pages/signIn/signIn";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <UserStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
