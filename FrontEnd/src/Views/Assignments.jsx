import { useState, useEffect } from "react";
import { getTasks, postTask } from "../Services/TaskService";
import { getAssignments } from "../Services/AssignmentService";
import {getTeachers} from "../Services/TeacherService"
function Assignments({ currentUser, role, setModal }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [teachers,setTeachers] = useState([]);
  const [filesByAssignment, setFilesByAssignment] = useState({});


  console.log("currentUser:", currentUser);

  useEffect(() => {
    const fetchTasks = async () => {
      const currentTasks = await getTasks();
      const teacherTasks = currentTasks.filter((t) => t.teacherID === currentUser.teacherID);
      setTasks(teacherTasks);
    };
    if (role === 'Teacher') {
    fetchTasks();
    }
  }, []);

  // Log every time tasks updates
  useEffect(() => {
    console.log("Updated tasks state:", tasks);
  }, [tasks]);

  useEffect(() => {
    const fetchAssignments = async () => {
      const currentAssignments = await getAssignments();   
      const studentAssignments = currentAssignments.filter(
        a => a.studentID === currentUser.studentID
      );
  
      const currentTasks = await getTasks();
  
      // Same filter as before
      const filteredTasks = currentTasks.filter(t =>
        studentAssignments.some(a => a.taskID === t.taskID)
      );
  
      // Attach assignmentID to each task
      const tasksWithAssignmentID = filteredTasks.map(task => {
        const matchingAssignment = studentAssignments.find(
          a => a.taskID === task.taskID
        );
        return {
          ...task,
          assignmentID: matchingAssignment.assignmentID,
          submitted: matchingAssignment.submitted,
          grade: matchingAssignment.grade,
          feedback: matchingAssignment.feedback
        };
      });
  
      setAssignments(tasksWithAssignmentID);
  
      const allTeachers = await getTeachers();
      setTeachers(allTeachers);
    };
  
    if (role === 'Student') {
      fetchAssignments();
    }
  }, []);

  // Log every time tasks updates
  useEffect(() => {
    console.log("assignments", assignments);
  }, [assignments]);

  const handleFileChange = (taskID, newFiles) => {
    setFilesByAssignment(prev => {
      const existing = prev[taskID] ? Array.from(prev[taskID]) : [];
      const incoming = Array.from(newFiles);
  
      return {
        ...prev,
        [taskID]: [...existing, ...incoming]
      };
    });
  };

  const showTasks = tasks.map((task) => (
    <div key={task.taskID} className="my-2 rounded-md bg-white shadow-md flexflex-col items-center justify-center z-0">

          
          <div className="flex flex-col p-3 items-center justify-center border-b border-gray-300">
            <h3 className="text-2xl mb-3">{task.name}</h3>
            <div className="flex flex-row">
              <p className="mr-3">{task.description}</p>
              <p>Deadline : {task.deadline}</p>
            </div>
          </div>     
          <div  className="p-3 flex items-center flex-row justify-between">
            <button className="flex flex-row items-center bg-blue-100 p-2 rounded-md cursor-pointer" 
            onClick={() => setModal([true,'assignStudents',task.taskID])}>
              <i className="fa-solid fa-circle-user text-xl mr-1"></i>
              <p>Assign Students</p> 
            </button>
            <a className="cursor-pointer" onClick={() => setModal([true,'viewAssigned',task.taskID])}>Assigned Students</a>
          </div>
          
    </div>
  ));
  
  const showAssignments = assignments.map((a) => {
    const currentTeacher = teachers.find((t) => t.teacherID === a.teacherID);
    if (!a.submitted){
    return(
      <>
    
      <div className="mr-16">
      
      <div className="flex flex-col flex-1 p-3 shadow-md bg-white my-4">
        <h2 className="text-2xl">{a.name}</h2>
        <p className="mt-3 text-lg">{a.description}</p>

        <p className="mt-3">
          Assigned By: {currentTeacher ? `${currentTeacher.fname} ${currentTeacher.sname}` : "Loading..."}
        </p>

        <p className="mt-3">Deadline - {a.deadline}</p>


        <div className="mt-4 p-3 bg-gray-100 rounded-md flex flex-row items-center justify-between">
              <div>
                <p>Complete Assignment</p>
                <button className="bg-blue-100 p-2 rounded-md w-full mr-5 cursor-pointer" onClick={() => setModal([true,'openText',a])}>Open text area</button>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 ml-5 cursor-pointer" onClick={() => console.log(filesByAssignment)}>
                Submit
              </button>
          </div>
      </div>
      </div>

      </>
    );
  }
  })

  const showFeedback = assignments.map((a) => {
    const currentTeacher = teachers.find((t) => t.teacherID === a.teacherID);
    if (a.submitted){
      console.log(a,'a')
    return(
      <>
    
      <div className="mr-16">
      
      <div className="flex flex-col flex-1 p-3 shadow-md bg-white my-4">
        <h2 className="text-2xl">{a.name}</h2>
        <p className="mt-3 text-lg">{a.description}</p>

        <p className="mt-3">
          Assigned By: {currentTeacher ? `${currentTeacher.fname} ${currentTeacher.sname}` : "Loading..."}
        </p>

        <p>Grade : {a.grade}</p>
        <p className="mt-3">Feedback</p>
        <p className="bg-gray-100 p-2 rounded-md">{a.feedback}</p>
      </div>
      </div>

      </>
    );
  }
  })





  return (
    <>

      <div className="p-6">
        <h1 className="mb-3">Assignments</h1>
  
       {role==='Teacher' && <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col border border-gray-500 p-3 rounded-md mt-4 mr-5 w-full">
           <h2 className="text-4xl mb-3">Create New Task</h2> 
           <label className="text-xl">Task Name</label> 
           <input placeholder="Enter the name of the task" value={name} className="border border-gray-300 p-2" 
           onChange={(e) => setName(e.target.value)}/> <label className="mt-3 text-xl">Task Description</label> 
           <textarea placeholder="Enter a description for the task" value={description} className="border border-gray-300 p-2" 
           rows={8} cols={75} onChange={(e) => setDescription(e.target.value)}/> <button className="bg-blue-100 p-2 mt-3 rounded-md" 
           onClick={() => postTask({teacherID : currentUser.teacherID, name : name, description : description})}>Add</button>
          </div>
            {tasks.length > 0 && 
            <div className="w-full">
               <h2 className="text-4xl"> Current Tasks </h2>
                {showTasks} 
            </div>} 
          </div>} 
        
            
        {assignments.length > 0 &&
        <div className="flex flex-col lg:flex-row">
        <div>
          <h2 className="text-3xl">Current Assignments</h2>
          {showAssignments}
        </div>

        <div>
        <h2 className="text-3xl">Your feedback</h2>
        {showFeedback}
        </div>

        </div>}
          

        </div>  
    </>
  );
  }



  export default Assignments

