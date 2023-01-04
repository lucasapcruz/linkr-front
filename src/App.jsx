import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./assets/css/globalStyles";
import UserStyles from "./assets/css/userStyles";
import { AuthProvider } from "./hooks/authContext";
import Home from "./pages/home/home";
import SignIn from "./pages/signIn/signIn";
import SignUp from "./pages/signUp/signUp";
import TimelinePage from "./pages/Timeline/TImelinePage";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <UserStyles />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/timeline" element={<TimelinePage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
