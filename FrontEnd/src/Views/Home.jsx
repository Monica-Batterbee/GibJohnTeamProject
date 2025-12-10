import Browse from "../Components/Browse";
import { useEffect, useState } from "react";
import { getCourses } from "../Services/CourseService";
import Test from "../Components/Test";
import { getLearning } from "../Services/LearningService";

function Home({currentUser}) {
    const [courses, setCourses] = useState([]);
    const [learning, setLearning] = useState([]);
    const names = ['English','Maths','Geography','History'];
    const [selectedCourseID, setSelectedCourseID] = useState(null);

    useEffect(() => {
        async function fetchData() {
        const data = await getCourses();
        setCourses(data);

        const widerLearning = await getLearning();
        setLearning(widerLearning)
        console.log(widerLearning)
        console.log(learning)
        }
        fetchData();
    }, []);


    return (
    <>
    {!selectedCourseID && <div className="flex flex-col w-full">
    <div className="flex justify-between p-3 pl-8 w-full">

        <h1 className="text-black"> Your Tests </h1>

        <Browse placeholder={'Browse'}/>
    </div>

    <div className="p-3 pl-8" >
      <ul className="flex flex-row">
        {courses.map((course) => (
          <li key={course.courseID}>
            {names.includes(course.courseName) && <div 
            className="flex flex-col p-2 bg-blue-100 rounded-md mr-4 justify-center items-center shadow-md cursor-pointer" 
            onClick={() => setSelectedCourseID(course.courseID)}>
                  <b className="p-1 text-black">{course.courseName}</b>
                  <img className="w-52 h-52 rounded-sm" src={course.courseURL} />
                </div>}
          </li>
        ))}
      </ul>
      <h1 className="mt-5">Wider Learning</h1>
      <ul className="flex flex-row">
        {learning.map((course) => (
          <li key={course.contentID}>
              <div 
            className="flex flex-col p-2 bg-blue-100 rounded-md mr-4 justify-center items-center shadow-md cursor-pointer" >
                  <b className="p-1 text-black">{course.name}</b>
                  <img className="w-52 h-52 rounded-sm" src={course.uRL} />
                </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
    }
    {selectedCourseID && (
  <div className="flex flex-row justify-center items-start w-full p-4">
    <button className="mr-4 shrink-0 p-2 bg-blue-200 rounded-md px-3 cursor-pointer" onClick={() => setSelectedCourseID(null)}>Back</button>

    <div className="flex justify-center grow">
      <Test courseID={selectedCourseID.toString()} currentUser={currentUser} />
    </div>
  </div>
)}
    </>
    );
}

export default Home;
