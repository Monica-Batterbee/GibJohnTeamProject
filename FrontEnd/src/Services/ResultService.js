import axios from "axios";


const API_URL = "http://localhost:5130/api/results";

export const getResults = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data; 
    } catch (error) {
      console.error("Error fetching assignments:", error);
      throw error;
    }
  };


export const postResult = async (newResult) => {
    await axios.post(API_URL, newResult)
    .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

};