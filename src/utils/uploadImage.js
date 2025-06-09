/*
 * File         : uploadImage.js
 * Author       : Ganapathy
 * Description  : Utility function to upload an image file to the server using Axios.
 *               It creates a FormData object, appends the image file, and sends a POST request to the server.
 */

// import necessary modules
import axiosInstance from "./axiosInstance";
import { API_PATHS } from "./apiPaths";

// Function to upload an image file
const uploadImage = async (imageFile) => {
  const formData = new FormData();
  //   Append image file to form data
  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Set header for file upload
        },
      }
    );
    return response.data; // Return response data
  } catch (error) {
    console.error("Error uploading the image:", error);
    throw error;
  }
};

// Export the uploadImage function for use in other parts of the application
export default uploadImage;
