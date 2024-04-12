import axios from "axios";
import { config, getTokenFromLocalStorage } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const uploadImg = async (data) => {
  const response = await axios.post(`${base_url}/api/v1/product/image`, data, {
    headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage : ""
    }`,
    "Content-Type": "multipart/form-data",
  },});
  console.log(response.data)
  return response.data;
};


const deleteImg = async (id) => {
  const response = await axios.delete(
    `${base_url}/api/v1/product/image/remove${id}`,

    config
  );
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
