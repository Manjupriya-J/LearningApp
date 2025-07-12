import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./QuizPage.css";

const QuizPage = () => {
  const { id: moduleId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/quizzes/${moduleId}`)
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch quiz:", err);
      });
  }, [moduleId]);

  const handleOptionChange = (qId, selected) => {
    setAnswers({ ...answers, [qId]: selected });
  };

  const handleSubmit = () => {
    let total = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct_option) {
        total++;
      }
    });
    setScore(total);
  };

  return (
    <div className="quiz-page">
      <h2>📝 Quiz</h2>

      {questions.map((q, index) => (
        <div key={q.id} className="quiz-question">
          <p>
            <strong>Q{index + 1}:</strong> {q.question}
          </p>
          <div>
            {["A", "B", "C", "D"].map((opt) => (
              <label key={opt}>
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={opt}
                  checked={answers[q.id] === opt}
                  onChange={() => handleOptionChange(q.id, opt)}
                />
                {q[`option_${opt.toLowerCase()}`]}
              </label>
            ))}
          </div>
        </div>
      ))}

      {questions.length > 0 && (
        <button onClick={handleSubmit}>Submit</button>
      )}

      {score !== null && (
        <div className="quiz-result">
          <h3>
            🎉 Your Score: {score} / {questions.length}
          </h3>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
