import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import NewChallenge from "./pages/newChallenge";
import Header from "./components/Header";
import NewUser from "./pages/newUser";
import Login from "./pages/login";

import { ChallengeProvider } from "./context/challenge/ChallengeContext";

function App() {
  return (
    <ChallengeProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewChallenge />} />
          <Route path="/new-user" element={<NewUser />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ChallengeProvider>
  );
}

export default App;
