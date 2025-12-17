import { useState, useEffect } from "react";
import { getStudents } from "../Services/StudentService";
import { getRelationships, postRelationship } from "../Services/RelationshipService";
import { getAssignments,updateCurrentWork, postAssignment, updateSubmit, updateFeedback } from "../Services/AssignmentService";

function Modal({setModal, modal, currentUser}) {
    const [studentEmail, setStudentEmail] = useState('');
    const [cantFind, setCantFind] = useState(false);
    const [message, setMessage] = useState('');
    const [text, setText] = useState('');
    const [studentAssignments,setStudentAssignments] = useState([])
    const [grade, setGrade] = useState('')
    const [feedback, setFeedback] = useState('')

    useEffect(() => {
      //Retrieves previously saved work for this assignment
      async function getCurrent(id) {
        const all = await getAssignments();
        const assignment = all.find(a => a.assignmentID === id)
        setText(assignment.currentWork)
      }

      //Fetches all students assigned to a specific task
      async function fetchStudents(taskID) {
        const allAssignments = await getAssignments();
        const taskAssignments = allAssignments.filter(a => a.taskID === taskID);
      
        const allStudents = await getStudents();
      
        const assignedStudents = taskAssignments.map(a => {
          return allStudents.find(s => s.studentID === a.studentID);
        }); 

        const combined = taskAssignments.map(a => {
          const s = allStudents.find(st => st.studentID === a.studentID);
          console.log(s)
          return {
            assignmentID: a.assignmentID,
            studentName: s.fname,
            submitted: a.submitted,
            currentWork: a.currentWork
          };
        });
        
        setStudentAssignments(combined);
      }
      //Runs getCurrent if the student is opening assignment (Gets their previously saved work)
      if (modal[1] === 'openText'){
        getCurrent(modal[2].assignmentID);
      }
      //Runs fetchStudents if the teacher wants to view who they've previously assigned to the assignment
      if (modal[1] === 'viewAssigned'){
        fetchStudents(modal[2]);
      }
    },[])

    //Makes a relationship between the teacher and student when the teacher adds then
    async function makeRelationship() {
        const students = await getStudents();
        const foundStudent = students.find((s) => s.email === studentEmail)

        //posts the relationship to the relationship table
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

    //Checks if there is a relationship between the student and the teacher, if so the student is assigned to the task
    async function searchRelationships() {
      const students = await getStudents();
      const foundStudent = students.find((s) => s.email === studentEmail);
  
      if (!foundStudent) {
          setMessage("Couldn't find student");
          return;
      }
  
  
      const relationships = await getRelationships();
      const foundRelationship = relationships.find(
          (r) => r.teacherID === currentUser.teacherID &&
                 r.studentID === foundStudent.studentID
      );
  
      if (foundRelationship) {
          const newAssignment = {
              taskID: modal[2],
              studentID: foundRelationship.studentID
          };
          setMessage('Assigned student')
          postAssignment(newAssignment);
      }
  }

  //Saves the work the student has written in the text area
  async function saveWork() {
    const assignment = modal[2];
    await updateCurrentWork(assignment.assignmentID, text)
  };

  //Submits the work the student has written (Updates the record in assignments table)
  async function submitWork() {
    const assignment = modal[2];
    saveWork();
    await updateSubmit(assignment.assignmentID, true)
    setModal([false,''])
  }

  //Updates the record in assignments table to have the inputted feedback
  async function submitFeedback(id) {
    await updateFeedback(id, grade, feedback)
  }

    return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center">

{modal[1] === 'assignStudents' && 
//Allows teacher to assign students to a task
<div className="bg-white p-6 rounded-xl max-w-md w-full shadow-xl flex flex-col">
  <div className="flex flex-row justify-between">
    <h2 className="text-2xl font-bold mb-3">Assign Student</h2>
    <i className="fa-solid fa-x cursor-pointer" onClick={() => setModal([false,''])}></i>
  </div> 
  
  <label>Assign Student</label>

  <div className="flex items-center w-full gap-2">
    <input
      value={studentEmail}
      onChange={(e) => setStudentEmail(e.target.value)}
      placeholder="Enter the student's email"
      className="p-2 border-gray-400 border rounded-md mt-2 flex-1"
    />
    <button
      className="bg-blue-100 p-3 mt-2 rounded-md cursor-pointer"
      onClick={searchRelationships}
    >
      Assign Student
    </button>
  </div>

  {message && <b className="text-red-500 text-center mt-2">{message}</b>}

  <button
    onClick={() => setModal([false,''])}
    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
  >
    Close
  </button>
</div>
}

{modal[1] === 'addStudent' && 
    //Allows teacher to add student
    <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-xl flex flex-col">
        <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold mb-3">Assign Student</h2>
        <i className="fa-solid fa-x cursor-pointer" onClick={() => setModal([false,''])}></i>
      </div> 
     

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

    {modal[1] === 'openText' && 
    //Gives the student a text area to write their assignment
    <div className="bg-white p-3 rounded-md w-4/5  h-4/5 flex justify-between flex-col">
      <div className="grow flex flex-col">
      <div className="flex flex-row justify-between">
      <h2 className="text-3xl">Write you assignment here</h2>
      <i className="fa-solid fa-x cursor-pointer" onClick={() => setModal([false,''])}></i>
      </div>
      <textarea className="w-full px-2 pt-2 mt-3 grow" value={text}  onChange={(e) => setText(e.target.value)}></textarea>
      </div>

      <div className="flex justify-between mt-2">
        <button className="bg-blue-100 px-5  py-2 rounded-md cursor-pointer" onClick={() => saveWork()}>Save</button>
        <button className="bg-blue-100 px-5 py-2 rounded-md cursor-pointer" onClick={() => submitWork()}>Submit</button>
      </div>

    </div>
      }
    {modal[1] === 'viewAssigned' && 
      //Allows the teacher to see who has already been assigned to a task
      <div className="bg-white p-3 rounded-md">
        
        <div className="flex flex-row justify-between">
          <h2 className="text-3xl mr-3">Assigned Students</h2>
          <i className="fa-solid fa-x cursor-pointer" onClick={() => setModal([false,''])}></i>
          </div>  
        {studentAssignments.map((item, index) => (
          <div key={index} className="flex flex-row justify-between  p-2 my-2 border-b border-gray-300">
            <p >{item.studentName}</p>
            <div>
            </div>
            <div className="flex flex-col">
            <p style={{color : item.submitted ? 'green' : 'red'}} className="font-bold">{item.submitted ? "Submitted" : "Not Submitted"}</p>
            {item.submitted && <a className="cursor-pointer" onClick={() => setModal([true,'viewWork',item]) }>View Work</a>}
            </div>
          </div>
        ))}


      </div>
      }

      {modal[1] === 'viewWork' &&
        //Lets the teacher view the student's submitted work and add a grade and feedback
        <div className="bg-white rounded-md p-3">
          <div className="flex flex-row justify-between">
          <h2 className="text-3xl mb-3">Student's work</h2>
          <i className="fa-solid fa-x cursor-pointer" onClick={() => setModal([false,''])}></i>
          </div>
          <p className="bg-gray-200 p-3 rounded-md">{modal[2].currentWork}</p>
          <div className="flex flex-col mt-4">
            <label>Enter Grade</label>
            <input className="border-gray-300 border rounded-md p-1 mb-3" value={grade} onChange={(e) => setGrade(e.target.value)}/>
            <label>Enter feedback</label>
            <input className="border-gray-300 border rounded-md p-1" value={feedback} onChange={(e) => setFeedback(e.target.value)}/>
          </div>
          <button className="px-4 py-1 mt-3 bg-blue-100 rounded-md cursor-pointer" onClick={() => submitFeedback(modal[2].assignmentID)}>
            Send Feedback</button>
        
        </div>
      }
      </div>

    );
  }

export default Modal;