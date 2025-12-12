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
  try {
    const response = await axios.post(API_URL, newAssignment);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const updateCurrentWork = async (assignmentID, currentWork) => {
  try {
    const response = await axios.put(
      `${API_URL}/${assignmentID}/currentWork`,
      { currentWork }  // matches UpdateCurrentWorkDto
    );

    console.log("Updated current work:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating current work:", error);
    throw error;
  }
};

export const updateSubmit = async (assignmentID, submitted) => {
  try {
    const response = await axios.put(
      `${API_URL}/${assignmentID}/submitted`,
      { submitted}  
    );

    console.log("Updated submit:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating submit:", error);
    throw error;
  }
};

export const updateFeedback = async (assignmentID, grade, feedback) => {
  try {
    const response = await axios.put(
      `${API_URL}/${assignmentID}/feedback`,
      {grade, feedback}  
    );

    console.log("Updated submit:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating submit:", error);
    throw error;
  }
};