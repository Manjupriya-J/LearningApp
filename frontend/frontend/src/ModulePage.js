import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./ModulePage.css"; // ✅ Add this import

const ModulePage = () => {
  const { id: moduleId } = useParams();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/lessons/module/${moduleId}`)
      .then((res) => {
        setLessons(res.data);
      })
      .catch((err) => {
        console.error("❌ Error fetching lessons:", err);
      });
  }, [moduleId]);

  return (
    <div>
      <h2>Lessons in Module {moduleId}</h2>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <Link to={`/module/${lesson.module_id}/lesson/${lesson.id}`}>
              {lesson.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModulePage;
