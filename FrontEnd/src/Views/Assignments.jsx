function Assignments({ openModal }) {
    return (
      <>
      Assignments
      </>
      // <main className="text-black">
      //   <div className="mx-auto max-w-3xl">
      //     <h1 className="text-2xl font-bold pb-5">Assignments Student View</h1>
      //     <div className="border-2 border-black pt-5 pb-3">
      //       <h1 className="font-bold">Tasks</h1> {/* Tasks Section */}
      //       {assignmentsData.assignments.map((assignment, index) => (
      //         <details
      //           key={index}
      //           className="border-2 rounded-2xl border-black m-2 p-2"
      //         >
      //           <summary className="cursor-pointer font-bold">
      //             {assignment.subject}: Due Date: {assignment.DueDate}
      //           </summary>
      //           <p>Description: {assignment.description}</p>
      //           <div>
      //             <button
      //               className="border-2 pl-1 pr-1 m-1 border-blue-500 bg-blue-500 text-white rounded-3xl"
      //               name="view"
      //               id="view"
      //               onClick={() => openModal(assignment)}
      //             >
      //               View
      //             </button>
      //           </div>
      //         </details>
      //       ))}
      //     </div>
      //   </div>
      // </main>
    );
  }
  
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

  export default {Assignments}