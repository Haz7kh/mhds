import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/Questions.css";

const Questions = () => {
  const { courseId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [results, setResults] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/api/questions/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };

    fetchQuestions();
  }, [courseId]);

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
  };

  const handleCheckAnswer = (questionId, correctAnswer) => {
    const isCorrect = selectedAnswers[questionId] === correctAnswer;
    setResults({ ...results, [questionId]: isCorrect });
  };

  return (
    <div className="questions-container">
      <h2 className="questions-header">Questions</h2>
      <ul className="questions-list">
        {questions.map((question) => (
          <li key={question._id} className="questions-list-item">
            <div className="question-content">
              <div className="question-text-container">
                <p className="question-text">{question.questionText}</p>
                <ul className="answers-list">
                  {["a", "b", "c", "d"].map((option) => (
                    <li key={option} className="answer-item">
                      <label>
                        <input
                          type="radio"
                          name={`question-${question._id}`}
                          value={option}
                          checked={selectedAnswers[question._id] === option}
                          onChange={() =>
                            handleAnswerChange(question._id, option)
                          }
                        />
                        {option.toUpperCase()}: {question.answers[option]}
                      </label>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() =>
                    handleCheckAnswer(question._id, question.correctAnswer)
                  }
                  className="check-answer-button"
                >
                  Check Answer
                </button>
                {results[question._id] !== undefined && (
                  <p
                    className={`result ${
                      results[question._id] ? "correct" : "incorrect"
                    }`}
                  >
                    {results[question._id] ? "Correct!" : "Incorrect!"}
                  </p>
                )}
              </div>
              {question.imageUrl && (
                <div className="question-image-container">
                  <img
                    src={`http://localhost:3000${question.imageUrl}`}
                    alt="Question"
                    className="question-image"
                  />
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Questions;
