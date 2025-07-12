import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import QuizPage from "./components/QuizPage";
import LessonPage from "./components/LessonPage";
import ModulePage from "./ModulePage";
function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/module/:id" element={<ModulePage />} />
<Route path="/module/:id/lesson/:lessonId" element={<LessonPage />} />

<Route path="/module/:id/quiz" element={<QuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;
