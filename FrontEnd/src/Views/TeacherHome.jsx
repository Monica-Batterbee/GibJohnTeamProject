import Browse from "../Components/Browse";
import { useEffect, useState } from "react";
import { getCourses } from "../Services/CourseService";
import Test from "../Components/Test";
import { getLearning } from "../Services/LearningService";
import BiologyPage from "./BiologyPage";
import MathsPage from "./MathsPage";

function TeacherHome({currentUser}) {
   

    return (
    <>
    <div className="flex flex-col w-full">
    <div className="flex justify-between p-3 pl-8 w-full">

        <h1> Teacher View </h1>

        <Browse placeholder={'Browse'}/>
    </div>
    </div>
   
    </>
    );
}

export default TeacherHome;
