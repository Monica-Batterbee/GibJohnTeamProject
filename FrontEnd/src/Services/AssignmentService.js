import axios from "axios";


const API_URL = "http://localhost:5130/api/assignments";

export const getAssignments = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data; 
    } catch (error) {
      console.error("Error fetching assignments:", error);
      throw error;
    }
  };


export const postAssignment = async (newAssignment) => {
    await axios.post(API_URL, newAssignment)
    .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

};