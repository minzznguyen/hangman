import React, { useState, useEffect } from "react";
import './leaderboard.css';
import { db } from "../services/firebase.js";
import { collection, query, onSnapshot } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
function Leaderboard() {
  const [users, loading, error] = useCollection(
    query(collection(db, "Players")),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  useEffect(() => {
    setTableUpdate(true);
    setTimeout(() => {
      setTableUpdate(false);
    }, [300])
  }, [users])

  const usersData = users?.docs.map(doc => ({
    id: doc.id,
    username: doc.id,
    gamesPlayed: doc.data().scores ? doc.data().scores.length : 0,
    totalScore: doc.data().scores ? doc.data().scores.reduce((a, b) => a + b, 0) : 0,
    averageScore: doc.data().scores && doc.data().scores.length > 0 ? (doc.data().scores.reduce((a, b) => a + b, 0) / doc.data().scores.length).toFixed(2) : 0,
  })).sort((a, b) => b.totalScore - a.totalScore).slice(0, 30);

  const [tableUpdate, setTableUpdate] = useState(false);

  return (
    <div className="leaderboard-container">
      <h1>Leaderboard</h1>
      {error && <p>Error fetching leaderboard data</p>}
      {loading && <p>Loading leaderboard data...</p>}
      {!loading && !error && (
        <table className={`leaderboard-table ${tableUpdate? 'update' : ''}`} >
          <thead>
            <tr>
              <th>User</th>
              <th>Games Played</th>
              <th>Total Score</th>
              <th>Average Score</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.gamesPlayed}</td>
                <td>{user.totalScore}</td>
                <td>{user.averageScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Leaderboard;
