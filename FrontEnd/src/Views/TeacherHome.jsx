import React, { useEffect, useState } from "react";
import { getTasks } from "../Services/TaskService.js";
import { getRelationships } from "../Services/RelationshipService";
import { getStudents } from "../Services/StudentService";

function TeacherHome({currentUser, role, modal, setPage, setLearner}) {
  const [assignments, setAssignments] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [students,setStudents] = useState([])

  useEffect(() => {
    async function fetchAssignments() {
        const tasks = await getTasks();
        const teacherTasks = tasks.filter((t) => t.teacherID === currentUser.teacherID)
        setAssignments(teacherTasks);
    }
    async function fetchStudents() {
      const relationships = await getRelationships();
      const allStudents = await getStudents();
    
      const teacherRelations = relationships.filter(
        r => r.teacherID === currentUser.teacherID
      );
    
      const studentIds = new Set(
        teacherRelations.map(r => r.studentID)
      );
    
      const studentsForTeacher = allStudents.filter(
        s => studentIds.has(s.studentID)
      );
      console.log(studentsForTeacher)
    
      setStudents(studentsForTeacher);
    }

    fetchAssignments()
    fetchStudents()
  }, []);



  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  function openProgress(s) {
    console.log('s',s)
    setLearner(s)
    setPage('Progress')
  }


  const cards = [
    {
      title: "Current set assignments",
      content: (
        <>
          {assignments.slice(0, showAll ? assignments.length : 2).map((assignment, index) => (
            <div key={index} className="mb-2 bg-gray-200 w-full rounded-md p-2">
              <h2 className="font-bold">{assignment.title}</h2>
              <p className="font-bold">{assignment.name}</p>
              <p>Due Date: {assignment.deadline}</p>
              <p>{assignment.description}</p>
            </div>
          ))}
          {assignments.length > 2 && (
            <button
              onClick={toggleShowAll}
              className="mt-2 text-blue-500 cursor-pointer underline">
              {showAll ? "Show Less" : "Show More"}
            </button>
          )}
        </>
      ),
    },
    { title: "Learner Progress", content:(
      <>
        {
          students.map((s) => (
            <div className="flex flex-row justify-between w-full items-center my-2 border-b border-gray-300 p-2">
              <p key={s.studentID}>{s.fname}  {s.sname}</p>
              <button className="bg-blue-100 rounded-md px-4 py-1 ml-3 cursor-pointer" onClick={() => openProgress(s)}>View Progress</button>
            </div>
          ))
        }
      </>
    )},
    { title: "Student Points", content: (
      <>
        <button className="bg-blue-100 rounded-md p-5 ml-3 cursor-pointer" onClick={() => setPage('StudentDashboard')}>View Student Dashboard</button>
      
      </>
    )},
  ];

  return (
    <div className="p-3">
      <h1 className="font-bold text-3xl mb-4">Teacher Dashboard</h1>
      <div className="p-4">
        <div className="flex flex-wrap gap-4 justify-center">
          {cards.map((card, index) => (
            <div
              key={index}
              className="shadow-2xl p-4 rounded-lg bg-white">
              <h2 className="text-center font-bold text-3xl mb-2">{card.title}</h2>
              <div className="p-2 m-2 rounded-2xl flex items-center justify-center flex-col">{card.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;