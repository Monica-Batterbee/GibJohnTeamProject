import axios from "axios";


const API_URL = "http://localhost:5130/api/relationships";

export const getRelationships = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data; 
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  };


export const postRelationship = async (newRelationship) => {
    await axios.post(API_URL, newRelationship)
    .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

};