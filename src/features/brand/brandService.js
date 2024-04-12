import axios from "axios";
import { config, getTokenFromLocalStorage } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const getBrands = async () => {
  const response = await axios.get(`${base_url}/api/v1/brand/all`);

  return response.data;
};

const createBrand = async (brand) => {
  const response = await axios.post(`${base_url}brand/`, brand, config);

  return response.data;
};
const updateBrand = async (brand) => {
  const response = await axios.put(
    `${base_url}brand/${brand.id}`,
    { title: brand.brandData.title },
    config
  );

  return response.data;
};
const getBrand = async (id) => {
  const response = await axios.get(`${base_url}brand/${id}`, config);

  return response.data;
};

const deleteBrand = async (id) => {
  const response = await axios.delete(`${base_url}brand/${id}`,  {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage}`,
      "Content-Type": "application/json"
    }
  });

  return response.data;
};

const brandService = {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};

export default brandService;
