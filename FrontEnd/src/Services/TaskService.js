import axios from "axios";

// Replace with your backend URL
const API_URL = "http://localhost:5130/api/tasks";

export const getTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data; 
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  };

  export const postTask = async (newTask) => {
    try {
        const response = await axios.post(API_URL, newTask);
        console.log("Task created:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
};