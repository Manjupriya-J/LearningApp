import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./LessonPage.css";


const LessonPage = () => {
  const { id: moduleId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/lessons/${moduleId}/${lessonId}`)
      .then((res) => setLesson(res.data))
      .catch((err) => console.error("Error fetching lesson:", err));
  }, [moduleId, lessonId]);

  if (!lesson) return <p>Loading...</p>;

  return (
    <div className="lesson-page">
      <h2>{lesson.title}</h2>

      {/* ✅ Show multiple images */}
      {lesson.images && lesson.images.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          {lesson.images.map((img) => (
            <img
              key={img.id}
              src={img.image_url}
              alt="Lesson"
             
            />
          ))}
        </div>
      )}

      {/* ✅ Show video if present */}
      {lesson.video_url && (
        <div style={{ marginBottom: "20px" }}>
          <iframe
            width="100%"
            height="400"
            src={lesson.video_url}
            title="Lesson Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
            allowFullScreen
          />
        </div>
      )}

      <p>{lesson.content}</p>
    </div>
  );
};

export default LessonPage;
