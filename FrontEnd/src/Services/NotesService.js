import axios from "axios";


const API_URL = "http://localhost:5130/api/notes";

export const getNotes = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data; 
    } catch (error) {
      console.error("Error fetching assignments:", error);
      throw error;
    }
  };


export const postNote = async (newNote) => {
    await axios.post(API_URL, newNote)
    .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

};


export async function deleteNote(id) {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  }