import axios from "axios";

// Replace with your backend URL
const API_URL = "http://localhost:5130/api/courses";

// Get all courses
export const getCourses = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // array of courses
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};