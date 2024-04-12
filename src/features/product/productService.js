import axios from "axios";
import { config, getTokenFromLocalStorage } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async (filters) => {
  const response = await axios.get(`${base_url}/api/v1/product/all${filters}`);

  return response.data;
};
const createProduct = async (product) => {
  const response = await axios.post(`${base_url}/api/v1/product`, product,{
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

const productService = {
  getProducts,
  createProduct,
};

export default productService;
