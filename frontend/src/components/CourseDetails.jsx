import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState({
    title: "",
    description: "",
    questions: [],
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/api/courses/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCourse(response.data);
      } catch (error) {
        console.error("Failed to fetch course details:", error);
      }
    };

    fetchCourse();
  }, [id]);

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <h3>Questions</h3>
      <ul>
        {course.questions && course.questions.length > 0 ? (
          course.questions.map((question) => (
            <li key={question._id}>{question.text}</li>
          ))
        ) : (
          <p>No questions available for this course.</p>
        )}
      </ul>
    </div>
  );
};

export default CourseDetails;
