import axios from "axios";

// Replace with your backend URL
const API_URL = "http://localhost:5130/api/students";

export const getStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data; // array of courses
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  };

// Get all courses
export const postStudents = async (newUser) => {
    await axios.post(API_URL, newUser)
    .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

};