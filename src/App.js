import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from "react";
import JoinScreen from './pages/join';
import MainScreen from './pages/main';
import LeaderboardScreen from './pages/leaderboard';
import ShareScreen from './pages/share';
import LoginScreen from './pages/login';
import ForgotPassScreen from './pages/forgotPassword';
import SignupScreen from './pages/signup';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/"       element={<LoginScreen />} />
        <Route path="/main"       element={<MainScreen />} />
        <Route path="/forgot"       element={<ForgotPassScreen />} />
        <Route path="/signup"       element={<SignupScreen />} />
        <Route path="/leaderboard" element={<LeaderboardScreen />} />
        <Route path="/join/:encodedCiphertext"   element={<JoinScreen />} />
        <Route path="/share/"   element={<ShareScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
