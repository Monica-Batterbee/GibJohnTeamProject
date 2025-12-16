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
      async function getCurrent(id) {
        const all = await getAssignments();
        const assignment = all.find(a => a.assignmentID === id)
        setText(assignment.currentWork)
      }

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

      if (modal[1] === 'openText'){
        getCurrent(modal[2].assignmentID);
      }

      if (modal[1] === 'viewAssigned'){
        fetchStudents(modal[2]);
      }
    },[])

    
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

  async function saveWork() {
    const assignment = modal[2];
    await updateCurrentWork(assignment.assignmentID, text)
  };

  async function submitWork() {
    const assignment = modal[2];
    saveWork();
    await updateSubmit(assignment.assignmentID, true)
    setModal([false,''])
  }

  async function submitFeedback(id) {
    await updateFeedback(id, grade, feedback)
  }

    return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center">

{modal[1] === 'assignStudents' && 
<div className="bg-white p-6 rounded-xl max-w-md w-full shadow-xl flex flex-col">
  <div className="flex flex-row justify-between">
    <h2 className="text-2xl font-bold mb-3">Assign Student</h2>
    <i className="fa-solid fa-x cursor-pointer" onClick={() => setModal([false,''])}></i>
  </div> 
  
  <label>Find Student</label>

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
      Find student
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
      <div className="bg-white p-3 rounded-md">
        
        <div className="flex flex-row justify-between">
        <h2 className="text-3xl mr-3">Assigned Students</h2>
          <i className="fa-solid fa-x cursor-pointer" onClick={() => setModal([false,''])}></i>
          </div>  
        {studentAssignments.map((item, index) => (
          <div key={index} className="flex flex-row justify-between my-2">
            <p>{item.studentName}</p>
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
          <button className="px-4 py-1 mt-3 bg-blue-100 rounded-md cursor-pointer" onClick={() => submitFeedback(modal[2].assignmentID)}>Send Feedback</button>
        
        </div>
      }
      </div>

    );
  }

export default Modal;