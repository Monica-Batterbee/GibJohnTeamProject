import { getResults } from "../Services/ResultService";
import { getCourses } from "../Services/CourseService";
import { useEffect, useState } from "react";
import Test from "../Components/Test";

function Tracker({currentUser, role, modal, setPage, setLearner, learner}) {
    const [results, setResults] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedCourseID, setSelectedCourseID] = useState(null);
  
    useEffect(() => {
      console.log(role)
      console.log(learner)
      let filteredResults = []
      async function loadData() {
        const allCourses = await getCourses();
        const allResults = await getResults();

        if (role === 'Student'){
        filteredResults = allResults.filter(
          (r) => r.studentID === currentUser.studentID
        );
      }

      else {
        filteredResults = allResults.filter(
          (r) => r.studentID === learner.studentID
        );
      }
  
        setCourses(allCourses);
        setResults(filteredResults);

      }
  
      loadData();
    }, []);


  return (
    <>
    {!selectedCourseID && <div className="p-2 m-2">
    <h1 className="text-2xl font-bold mb-4">Progress Tracker</h1>

    {role === 'Teacher' && <p className="font-bold ml-3">Results for {learner.fname}  {learner.sname}</p>}

    <div className="p-2 m-2 border-2 rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {courses.map((course) => {
        const courseResults = results.filter(
            (r) => r.courseID === course.courseID
        );

        const total = courseResults.length;

        const avg =
            total > 0
            ? (courseResults.reduce((sum, r) => sum + r.score, 0) / total).toFixed(
                1
                )
            : 0;

        const max =
            total > 0
            ? Math.max(...courseResults.map((r) => r.score))
            : 0;

        return (
            <div
            key={course.courseID}
            className="p-2 border-2 rounded-2xl shadow-xl bg-white"
            >
            <h1 className="font-bold text-center text-xl">{course.courseName}</h1>

            <div className="p-2 m-2 space-y-1">
                <h3 className="font-semibold">Tests completed:</h3>
                <p>{total}</p>

                <h3 className="font-semibold">Average score:</h3>
                <p>{avg}%</p>

                <h3 className="font-semibold">Highest score:</h3>
                <p>{max}%</p>

                {max !== 100 && total > 0 && role==='Student' && <button className="bg-blue-100 px-5 py-1 rounded-md cursor-pointer mt-2"
                onClick={() => setSelectedCourseID(course.courseID)} >Retake test</button>}
            </div>
            </div>
        );
        })}

    </div>
    </div>}
    {selectedCourseID && 
  <div className="flex flex-row justify-center items-start w-full p-4">
    <button className="mr-4 shrink-0 p-2 bg-blue-200 rounded-md px-3 cursor-pointer" onClick={() => setSelectedCourseID(null)}>Back</button>

    <div className="flex justify-center grow">
      <Test courseID={selectedCourseID.toString()} currentUser={currentUser} />
    </div>
  </div>}
  </>
);

}


export default Tracker;