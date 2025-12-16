import React, { useState, useEffect } from "react";
import { getResults } from "../Services/ResultService";

function Rewards({currentUser}) {
  const [points, setPoints] = useState(0)
  useEffect(() => {
    let sum= 0;
    async function getPoints() {
      const results = await getResults();
      const userScores = results
        .filter(r => r.studentID === currentUser.studentID)
        .map(r => r.score);
      
      userScores.forEach(score => {
        sum += score
      });
      
      return sum;
    }

    setPoints(getPoints())
  },[])

  return(
    <>
    <div className="p-3 flex flex-col">
      <h1>Rewards</h1>
      <p className="text-2xl mt-3">You have {points} points</p>
    </div>
    </>
  );
}

export default Rewards;
// import users from "./User.json";
 
// const Rewards = () => {
//   const [message, setMessage] = useState("");
//   const [image, setImage] = useState("");
 
//   useEffect(() => {
//     const user = users[0];
//     const points = parseInt(user.Points.replace("%", ""));
 
//     if (points >= 100) {
//       setMessage("So many points! 🧠");
//     } else if (points >= 80) {
//       setMessage("So many points! 🫀");
//     } else if (points >= 50) {
//       setMessage("You did fine! 🤺");
//     } else {
//       setMessage("Never try again! 🫏");
//     }
 
 
//   //   if (points >= 100) 
//   //     {
//   //     setImage("https://media.istockphoto.com/id/842324660/photo/businesspeople-exchanging-visiting-card.jpg?s=612x612&w=0&k=20&c=vh-APoAyYm3fKf4pVpzzoc32_Sp4MrSe24ZoqxOaVfU=%22);
//   //   } else if (points >= 80) {
//   //     setImage("https://media.istockphoto.com/id/842324660/photo/businesspeople-exchanging-visiting-card.jpg?s=612x612&w=0&k=20&c=vh-APoAyYm3fKf4pVpzzoc32_Sp4MrSe24ZoqxOaVfU=%22);
//   //   } else if (points >= 50) {
//   //     setImage("https://media.istockphoto.com/id/842324660/photo/businesspeople-exchanging-visiting-card.jpg?s=612x612&w=0&k=20&c=vh-APoAyYm3fKf4pVpzzoc32_Sp4MrSe24ZoqxOaVfU=%22);
//   //   } else {
//   //     setImage("https://media.istockphoto.com/id/842324660/photo/businesspeople-exchanging-visiting-card.jpg?s=612x612&w=0&k=20&c=vh-APoAyYm3fKf4pVpzzoc32_Sp4MrSe24ZoqxOaVfU=%22);
//   //   }
//   // }, []);
 
//   return (
//     <div
//       style={{
//         display: "block",
//         justifyContent: "center",
//         textAlign: "center",
//         backgroundColor: "#f8f9fa",
//         padding: "20px",
//       }}
//     >
//       <h1 style={{ marginBottom: "30px" }}>
//         Reward Page!
//       </h1>
 
//       <p style={{ marginTop: "20px" }}>
//         You got {users[0].Points}, <strong>{message}</strong> your reward is:<br/>
//       </p>
 
     
//       {image && (
//         <img
//           src={image}
//           alt="Reward"
//           style={{ width: "100px", marginTop: "20px", borderRadius: "10px", justifyContent: "center" }}
//         />
//       )}
 
//       <button
//         type="submit"
//         style={{
//           width: '20%',
//           padding: '1px',
//           color: 'black',
//           border: '1px solid #020202',
//           borderRadius: '6px',
//           cursor: 'pointer',
//           marginTop: '25px'
//         }}
//       >
//         Try again?
//       </button>
//     </div>
//   );
//   }
//   )};


 
// export default Rewards;
 
 
 
 