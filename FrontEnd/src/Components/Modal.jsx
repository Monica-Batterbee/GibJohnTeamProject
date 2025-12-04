import { useState } from "react";
import { getStudents } from "../Services/StudentService";
import { getRelationships, postRelationship } from "../Services/RelationshipService";
import { getAssignments, postAssignment } from "../Services/AssignmentService";

function Modal({setModal, modal, currentUser}) {
    const [studentEmail, setStudentEmail] = useState('');
    const [cantFind, setCantFind] = useState(false);

    async function makeRelationship() {
        const students = await getStudents();
        const foundStudent = students.find((s) => s.email === studentEmail)

        if (foundStudent) {
            const newRelationship = {
                teacherID : currentUser.teacherID,
                studentID : foundStudent.studentID
            }
            setCantFind(false)
            postRelationship(newRelationship)
        }
        else{
            setCantFind(true);
        }
    }

    async function searchRelationships() {
        const students = await getStudents();
        const foundStudent = students.find((s) => s.email === studentEmail)

        if (foundStudent) {
           const relationships = await getRelationships();
           const foundRelationship = relationships.find((r) => r.teacherID === currentUser.teacherID && r.studentID === foundStudent.studentID)

           if (foundRelationship) {
                const newAssignment = {
                    taskID : modal[2],
                    studentID : foundRelationship.studentID
                }
                console.log('json,',newAssignment)
                console.log(modal)
                postAssignment(newAssignment)
           }
        }
    }

    return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center">

    {modal[1] === 'assignStudents' && 
    <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-xl flex flex-col">
      <h2 className="text-2xl font-bold mb-3">Assign Student</h2>
      <label>Find Student</label>
      <div className="flex items-center w-full gap-2">
        <input value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)}
        placeholder="Enter the student's email"
        className="p-2 border-gray-400 border rounded-md mt-2 flex-1"
        />
        <button className="bg-blue-100 p-3 mt-2 rounded-md cursor-pointer" onClick={searchRelationships}>
        Find student
        </button>
        </div>
      <button
        onClick={() => setModal([false,''])}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
      >
        Close
      </button>
    </div>
    }

{modal[1] === 'addStudent' && 
    <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-xl flex flex-col">
      <h2 className="text-2xl font-bold mb-3">Add Student</h2>

      <label>Student email</label>
    <div className="flex items-center w-full gap-2">
        <input value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)}
        placeholder="Enter the student's email"
        className="p-2 border-gray-400 border rounded-md mt-2 flex-1"
        />
        <button className="bg-blue-100 p-3 mt-2 rounded-md cursor-pointer" onClick={makeRelationship}>
        Add student
        </button>
    </div>

    {cantFind === true && <b className="text-red-500 text-center">Cant find student</b>}

      <button
        onClick={() => setModal([false,''])}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
      >
        Close
      </button>
    </div>
    }
  </div>
    );
}

export default Modal;