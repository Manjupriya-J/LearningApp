import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import "./Dashboard.css";



const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) setUserName(name);
    else navigate("/login"); // redirect if not logged in
  }, [navigate]); // ✅ Include navigate in dependency array

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const modules = [
    { id: 1, name: "Introduction to ISL", emoji: "📖" },
    { id: 2, name: "Basic Signs", emoji: "🤟" },
    { id: 3, name: "Common Phrases", emoji: "🗣️" },
    { id: 4, name: "Family & Relations", emoji: "👨‍👩‍👦" },
    { id: 5, name: "Daily Activities", emoji: "🕰️" },
    { id: 6, name: "Numbers & Counting", emoji: "🔢" },
    { id: 7, name: "Colors & Shapes", emoji: "🎨" },
    { id: 8, name: "Emotions & Feelings", emoji: "😊" },
    { id: 9, name: "Food & Drinks", emoji: "🍔" },
    { id: 10, name: "Emergency Signs", emoji: "🚨" },
  ];

  return (
    <div className="dashboard-container">
      <button className="logout-button" onClick={handleLogout} title="Logout">
        <FaSignOutAlt />
      </button>

      <div className="welcome-section">
        <FaUserCircle className="user-icon" />
        <h2>Welcome, {userName}!</h2>
      </div>

      <div className="modules-container">
        {modules.map((module) => (
          <div key={module.id} className="module-card">
            <span className="module-emoji">{module.emoji}</span>
            <p>{module.name}</p>

            <div className="module-buttons">
              <button onClick={() => navigate(`/module/${module.id}`)}>
                View Lessons
              </button>
              <button onClick={() => navigate(`/module/${module.id}/quiz`)}>
                Start Quiz
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
