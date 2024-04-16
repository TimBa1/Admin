import axios from "axios";
import { config, getTokenFromLocalStorage } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const getBrands = async (filter) => {
  const response = await axios.get(`${base_url}/api/v1/brand/all${filter}`);

  return response.data;
};

const createBrand = async (brand) => {
  const response = await axios.post(`${base_url}/api/v1/brand`, brand, {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
const updateBrand = async (brand) => {
  const response = await axios.put(
    `${base_url}brand/${brand.id}`,
    { title: brand.brandData.title },
    {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage}`,
        "Content-Type": "multipart/form-data",
      },
    }
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
