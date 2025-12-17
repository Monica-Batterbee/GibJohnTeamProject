import { useEffect, useState } from "react"
import { getRelationships } from "../Services/RelationshipService"
import { getResults } from "../Services/ResultService"
import { getStudents } from "../Services/StudentService"

function StudentDashboard({ currentUser }) {
    const [studentPoints, setStudentPoints] = useState([]);

    useEffect(() => {
      async function fetchStudentPoints() {
        const relationships = await getRelationships();
        const students = await getStudents();
        const results = await getResults();
  
        //Get teacher → student relationships
        const teacherRelations = relationships.filter(
          r => r.teacherID === currentUser.teacherID
        );
  
        // Get students for this teacher
        const studentIds = new Set(
          teacherRelations.map(r => r.studentID)
        );
  
        const studentsForTeacher = students.filter(
          s => studentIds.has(s.studentID)
        );
  
        //Use YOUR logic: sum scores per student
        const studentsWithPoints = studentsForTeacher.map(student => {
          let sum = 0;
  
          results
            .filter(r => r.studentID === student.studentID)
            .forEach(r => {
              sum += r.score;
            });
  
          return {
            ...student,
            points: sum
          };
        });

        studentsWithPoints.sort((a, b) => b.points - a.points);
  
        setStudentPoints(studentsWithPoints);
      }
  
      fetchStudentPoints();
    }, []);
  
    return (
        <>
    <div className="p-3 w-full flex flex-col ">
      <h1 className="text-2xl font-bold mb-4 ">Student Dashboard</h1>

      {studentPoints.map((student, index) => (
  <div
    key={student.studentID}
    className="flex justify-between border-b p-2"
  >
    <p>
      <span className="font-bold mr-2">{index + 1}.</span>
      {student.fname} {student.sname}
    </p>
    <p className="font-bold">{student.points} pts</p>
  </div>
    ))}
        </div>
        </>
    );
  }

export default StudentDashboard