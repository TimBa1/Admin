import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config, getTokenFromLocalStorage } from "../../utils/axiosconfig";

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}/api/v1/category/all`);

  return response.data;
};
const createCategory = async (category) => {
  const response = await axios.post(`${base_url}/api/v1/category`, category, {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

const getProductCategory = async (id) => {
  const response = await axios.get(`${base_url}category/${id}`, config);

  return response.data;
};

const deleteProductCategory = async (id) => {
  const response = await axios.delete(`${base_url}/api/v1/category/${id}`, config);

  return response.data;
};
const updateProductCategory = async (category) => {
  console.log(category);
  const response = await axios.put(
    `${base_url}/api/v1/category${category.id}`,
    { title: category.pCatData.title },
    config
  );

  return response.data;
};
const pCategoryService = {
  getProductCategories,
  createCategory,
  getProductCategory,
  deleteProductCategory,
  updateProductCategory,
};

export default pCategoryService;
