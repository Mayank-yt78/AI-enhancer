import react from "react";
import axios from "axios";

const API_KEY = "wxbruhfn0rt81f7v5";
const BASE_URL = "https://techhk.aoscdn.com";

export const enhancedImageApi = async (file) => {
  // code to call api
  try {
    const taskId = await uploadImage(file);
    console.log("Image uploaded successfully", taskId);

    const enhancedImageData = await PollforEnhancedImage(taskId);
    console.log("Enhanced image data received", enhancedImageData);

    return enhancedImageData;
  } catch (error) {
    console.log("Error enhancing image:", error.message);
  }
};

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image_file", file);

  const { data } = await axios.post(
    `${BASE_URL}/api/tasks/visual/scale`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-API-KEY": API_KEY,
      },
    }
  );

  if (!data?.data?.task_id) {
    throw new Error("Failed to upload image! Task ID not defined");
  }

  return data.data.task_id;
};

const PollforEnhancedImage = async (taskId, retries = 0) => {
    const result = await fetchEnhancedImage(taskId);
  
    if (result.state == 4) {
      console.log("processing....");
  
      if (retries >= 20) {
        throw new Error("Failed to fetch enhanced image! retries exceeded");
      }
  
      // wait for 2 sec
      await new Promise((resolve) => setTimeout(resolve, 2000));
  
      return PollforEnhancedImage(taskId, retries + 1);
    }
    console.log("Enhanced Image URL", result);
    return result;
};

const fetchEnhancedImage = async (task_id) => {
  const { data } = await axios.get(
    `${BASE_URL}/api/tasks/visual/scale/${task_id}`,
    {
      headers: {
        "X-API-KEY": API_KEY,
      },
    }
  );
  if (!data?.data) {
    throw new Error("Failed to fetch enhanced image! image not found");
  }

  return data.data;
};


// task_id: "f150e088-4c84-4e98-a8ea-32fc4c371d93"
