import { useState, useEffect } from "react";
import { getTasks, postTask } from "../Services/TaskService";
import { getAssignments } from "../Services/AssignmentService";

function Assignments({ currentUser, role, setModal }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [assignments, setAssignments] = useState([]);


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
      const taskIDs = currentAssignments
      .filter(a => a.studentID === currentUser.studentID)
      .map(a => a.taskID);
      const currentTasks = await getTasks();   
      setAssignments(currentTasks.filter((t) => taskIDs.includes(t.taskID)));
    };
    if (role === 'Student'){
    fetchAssignments();
    }
  }, []);

  // Log every time tasks updates
  useEffect(() => {
    console.log("assignments", assignments);
  }, [assignments]);


  const showTasks = tasks.map((task) => (
    <div key={task.taskID} className="my-2 rounded-md bg-blue-100 flex flex-row justify-between z-0">
      <div className="p-3">
          <h3 className="text-2xl">{task.name}</h3>
          <div className="bg-white items-center justify-center p-2 rounded-md mt-3">
            <p>{task.description}</p>
          </div>      
      </div>
      <div className="flex justify-center items-center rounded-r-md p-3 bg-green-100 ml-5 cursor-pointer" onClick={() => setModal([true,'assignStudents',task.taskID])}>
        <button>
          <i class="fa-solid fa-user"></i>
          <p>Assign Student</p>
        </button>
      </div>
    </div>
  ));
  
  const showAssignments = assignments.map((a) => {
    return(
      <>
      <div className="p-3 shadow-md">
        <h2>{a.name}</h2>
      </div>
      </>
    );
  })





  return (
    <>

      <div className="p-6">
        <h1>Assignments</h1>
  
       {role==='Teacher' && <div className="flex flex-row">
        <div className="flex flex-col border border-gray-500 p-3 rounded-md mt-4 mr-5">
           <h2 className="text-4xl mb-3">Create New Task</h2> 
           <label className="text-xl">Task Name</label> 
           <input placeholder="Enter the name of the task" value={name} className="border border-gray-300 p-2" 
           onChange={(e) => setName(e.target.value)}/> <label className="mt-3 text-xl">Task Description</label> 
           <textarea placeholder="Enter a description for the task" value={description} className="border border-gray-300 p-2" 
           rows={8} cols={75} onChange={(e) => setDescription(e.target.value)}/> <button className="bg-blue-100 p-2 mt-3 rounded-md" 
           onClick={() => postTask({teacherID : currentUser.teacherID, name : name, description : description})}>Add</button> </div>
            {tasks.length > 0 && <div> <h2 className="text-4xl"> Current Tasks </h2> {showTasks} </div>} 
            </div>} 

          {role === 'Student' && 
          <div>
            
          </div>}
          </div>   
    </>
  );
  }



  export default Assignments

  //       <main className="text-black">
  
  //       <div className="mx-auto max-w-3xl">
  //         <h1 className="text-2xl font-bold pb-5">Assignments Student View</h1>
  //         <div className="border-2 border-black pt-5 pb-3">
  //           <h1 className="font-bold">Tasks</h1> {/* Tasks Section */}
  //           {assignmentsData.assignments.map((assignment, index) => (
  //             <details
  //               key={index}
  //               className="border-2 rounded-2xl border-black m-2 p-2"
  //             >
  //               <summary className="cursor-pointer font-bold">
  //                 {assignment.subject}: Due Date: {assignment.DueDate}
  //               </summary>
  //               <p>Description: {assignment.description}</p>
  //               <div>
  //                 <button
  //                   className="border-2 pl-1 pr-1 m-1 border-blue-500 bg-blue-500 text-white rounded-3xl"
  //                   name="view"
  //                   id="view"
  //                   onClick={() => openModal(assignment)}
  //                 >
  //                   View
  //                 </button>
  //               </div>
  //             </details>
  //           ))}
  //         </div>
  //       </div>
  //     </main>
  
  
  // function TeacherUI({ openModal }) {
  //   return (
  //     <main className="text-black">
  //       <div className="mx-auto max-w-3xl">
  //         <h1 className="text-2xl font-bold pb-5">Assignments Teacher View</h1>
  //         <div className="border-2 border-black pt-5 pb-3">
  //           <h1 className="font-bold">Tasks</h1> {/* Tasks Section */}
  //           {assignmentsData.assignments.map((assignment, index) => (
  //             <details
  //               key={index}
  //               className="border-2 rounded-2xl border-black m-2 p-2"
  //             >
  //               <summary className="cursor-pointer font-bold">
  //                 {assignment.subject}: Due Date: {assignment.DueDate}
  //               </summary>
  //               <p>Description: {assignment.description}</p>
  //               <div>
  //                 <button
  //                   className="border-2 pl-1 pr-1 m-1 border-blue-500 bg-blue-500 text-white rounded-3xl"
  //                   name="view"
  //                   id="view"
  //                   onClick={() => openModal(assignment)}
  //                 >
  //                   View
  //                 </button>
  //                 <button className="border-2 pl-1 pr-1 m-1 border-blue-500 bg-blue-500 text-white rounded-3xl">
  //                   Hand In
  //                 </button>
  //               </div>
  //             </details>
  //           ))}
  //         </div>
  //       </div>
  //     </main>
  //   );
  // }
  
  // export default { UserUI, TeacherUI };