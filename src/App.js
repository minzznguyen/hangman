import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from "react";
import JoinScreen from './pages/join';
import MainScreen from './pages/main';
import LeaderboardScreen from './pages/leaderboard';
import ShareScreen from './pages/share';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"       element={<MainScreen />} />
        <Route path="/leaderboard" element={<LeaderboardScreen />} />
        <Route path="/join"   element={<JoinScreen />} />
        <Route path="/share"   element={<ShareScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
