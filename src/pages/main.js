import React from "react";
import { Link } from "react-router-dom";

function MainScreen() {
  return (
    <div>
      <p>main</p>
      <Link to='/leaderboard'>leaderboard</Link>
    </div>
  );
}

export default MainScreen;
