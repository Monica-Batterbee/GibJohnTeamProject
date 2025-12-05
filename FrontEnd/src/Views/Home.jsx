import Browse from "../Components/Browse";
import { useEffect, useState } from "react";
import { getCourses } from "../Services/CourseService";
import Test from "../Components/Test";

function Home() {
    const [courses, setCourses] = useState([]);
    const names = ['English','Maths','Geography','History'];
    const [selectedCourseID, setSelectedCourseID] = useState(null);

    useEffect(() => {
        async function fetchData() {
        const data = await getCourses();
        setCourses(data);
        }
        fetchData();
    }, []);


    return (
    <>
    {!selectedCourseID && <div className="flex flex-col w-full">
    <div className="flex justify-between p-3 pl-8 w-full">

        <h1 className="text-black"> Your Courses </h1>

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
    </div>
    </div>}
    {selectedCourseID && <div className="flex flex-row items-start">
      <button className="grow-0">Back</button>
      <div className="grow bg-blue-200">
        <Test courseID={selectedCourseID.toString()} />
      </div>
    </div>}
    </>
    );
}

export default Home;
