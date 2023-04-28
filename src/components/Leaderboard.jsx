 import React, { useState, useEffect } from "react";
 import './leaderboard.css';
function Leaderboard() {
  const [users, setUsers] = useState([
    { id: 1, username: "Alice", gamesPlayed: 5, totalScore: 100 },
    { id: 2, username: "Bob", gamesPlayed: 7, totalScore: 150 },
    { id: 3, username: "Charlie", gamesPlayed: 10, totalScore: 200 },
    { id: 4, username: "David", gamesPlayed: 3, totalScore: 75 },
    { id: 5, username: "Eve", gamesPlayed: 8, totalScore: 125 },
  ]);

//   useEffect(() => {
//     // fetch users data from API or database
//     const fetchUsers = async () => {
//       const response = await fetch("api/users");
//       const data = await response.json();
//       setUsers(data);
//     };

//     fetchUsers();
//   }, []);


return (
  <div className="leaderboard-container">
    <h1>Leaderboard</h1>
    <table className="leaderboard-table">
      <thead>
        <tr>
          <th>User</th>
          <th>Games Played</th>
          <th>Total Score</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.username}</td>
            <td>{user.gamesPlayed}</td>
            <td>{user.totalScore}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}

export default Leaderboard;
