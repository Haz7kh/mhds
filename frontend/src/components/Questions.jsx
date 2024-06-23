import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Questions = () => {
  const { courseId } = useParams();
  const [questions, setQuestions] = useState([]);

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

  return (
    <div>
      <h2>Questions</h2>
      <ul>
        {questions.map((question) => (
          <li key={question._id}>
            <p>{question.questionText}</p>
            {question.imageUrl && (
              <img
                src={`http://localhost:3000${question.imageUrl}`}
                alt="Question"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            )}
            <ul>
              <li>A: {question.answers.a}</li>
              <li>B: {question.answers.b}</li>
              <li>C: {question.answers.c}</li>
              <li>D: {question.answers.d}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Questions;
