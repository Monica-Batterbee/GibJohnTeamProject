import Browse from "../Components/Browse";
import { useEffect, useState } from "react";
import { getCourses } from "../Services/CourseService";


function Home() {
    const [courses, setCourses] = useState([]);
    const names = ['English','Maths','Geography','History'];

    useEffect(() => {
        async function fetchData() {
        const data = await getCourses();
        setCourses(data);
        }
        fetchData();
    }, []);

    return (
    <>
    <div className="flex flex-col w-full">
    <div className="flex justify-between p-3 pl-8 w-full">
        <h1> Test 2 </h1>
        <Browse className=""/>
    </div>

    <div className="p-3 pl-8">
      <ul className="flex flex-row">
        {courses.map((course) => (
          <li key={course.courseID}>
            {names.includes(course.courseName) && <div className="flex flex-col p-2 bg-blue-100 rounded-md mr-4 justify-center items-center shadow-md cursor-pointer">
                  <b className="p-1">{course.courseName}</b>
                  <img className="w-52 h-52 rounded-sm" src={course.courseURL} />
                </div>}
          </li>
        ))}
      </ul>
    </div>
    </div>
    </>
    );
}

export default Home;
