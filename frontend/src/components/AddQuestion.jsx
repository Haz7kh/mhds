import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AddQuestion.css";

const AddQuestion = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState({ a: "", b: "", c: "", d: "" });
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      let imageUploadUrl = "";

      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadResponse = await axios.post(
          "http://localhost:3000/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        imageUploadUrl = uploadResponse.data.filePath;
      }

      await axios.post(
        "http://localhost:3000/api/questions",
        {
          courseId: selectedCourse,
          questionText,
          answers,
          correctAnswer,
          imageUrl: imageUploadUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Question added successfully");
      setQuestionText("");
      setAnswers({ a: "", b: "", c: "", d: "" });
      setCorrectAnswer("");
      setImageFile(null);
    } catch (error) {
      console.error("Failed to add question:", error);
    }
  };

  const handleAnswerChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  return (
    <div className="add-question-container">
      <h2 className="add-question-header">Add Question</h2>
      <form className="add-question-form" onSubmit={handleAddQuestion}>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          required
          className="add-question-select"
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Question Text"
          value={questionText}
          className="add-question-textarea"
          onChange={(e) => setQuestionText(e.target.value)}
          required
        />
        <input
          type="text"
          name="a"
          placeholder="Answer A"
          value={answers.a}
          className="add-question-input-field"
          onChange={handleAnswerChange}
          required
        />
        <input
          type="text"
          name="b"
          placeholder="Answer B"
          value={answers.b}
          className="add-question-input-field"
          onChange={handleAnswerChange}
          required
        />
        <input
          type="text"
          name="c"
          placeholder="Answer C"
          value={answers.c}
          className="add-question-input-field"
          onChange={handleAnswerChange}
          required
        />
        <input
          type="text"
          name="d"
          placeholder="Answer D"
          value={answers.d}
          className="add-question-input-field"
          onChange={handleAnswerChange}
          required
        />
        <input
          type="text"
          placeholder="Correct Answer"
          value={correctAnswer}
          className="add-question-input-field"
          onChange={(e) => setCorrectAnswer(e.target.value)}
          required
        />
        <input
          type="file"
          className="add-question-input-field"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        <button type="submit" className="add-question-button">
          Add Question
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;
