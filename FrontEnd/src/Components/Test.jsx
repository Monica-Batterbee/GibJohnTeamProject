import React, { useState, useEffect } from "react";
import questions from "../assets/JSONs/questions.json";
import { getCourses } from "../Services/CourseService";

function Test({ courseID }) {
  const [course, setCourse] = useState(null);
  const [testQuestions, setTestQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    const load = async () => {
      const courses = await getCourses();

      const found = courses.find((c) => c.courseID == courseID); // loose compare
      setCourse(found);

      const q = questions[Number(courseID)] || []; // convert ID to number
      setTestQuestions(q);
    };

    load();
  }, [courseID]);

  const handleSelect = (questionIndex, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: option
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let total = 0;

    testQuestions.forEach((q, index) => {
      if (answers[index] === q.correct) {
        total++;
      }
    });

    setScore(total);
  };

  // Prevent crash while loading
  if (!course || testQuestions.length === 0) {
    return <div className="p-4">Loading test…</div>;
  }

  return (
    <div className="p-4 m-4 max-w-xl mx-auto space-y-6 border-2 rounded-2xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-4">
        {course.courseName} Multiple-Choice Test
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {testQuestions.map((item, index) => (
          <div key={index}>
            <p className="font-semibold">
              {index + 1}. {item.question}
            </p>

            {item.options.map((option, optionIndex) => (
              <label key={optionIndex} className="block">
                <input
                  type="radio"
                  name={`q${index}`}
                  value={option}
                  onChange={() => handleSelect(index, option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 cursor-pointer"
        >
          Submit
        </button>
      </form>

      {score !== null && (
        <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-600 rounded">
          <p className="text-lg font-bold">
            Your Score: {score} / {testQuestions.length}
          </p>
        </div>
      )}
    </div>
  );
}

export default Test;