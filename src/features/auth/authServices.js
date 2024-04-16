import axios from "axios";
import { config, getTokenFromLocalStorage } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";


const login = async (user) => {
  const response = await axios.post(`${base_url}/api/v1/auth/login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response?.data?.accessToken));
  }
  return response.data;
};


const updateAdmin = async (payload) => {
  const response = await axios.post(`${base_url}/api/v1/admin/update`, payload);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response?.data?.accessToken));
  }
  return response.data;
};




///ORDERS
const getOrders = async ( filters ) => {
  const response = await axios.get(`${base_url}/api/v1/order/all${filters}`, config);

  return response.data;
};


const getCustomerOrder = async (customerId,filters) => {
  const response = await axios.get(
    `${base_url}/api/v1/order/customer/${customerId}${filters}`,
    config
  );
  return response.data;
};

const getRecentOrders = async (filters) => {
  const response = await axios.get(
    `${base_url}/api/v1/order/recent${filters}`,
    config
  );
  return response.data;
};




const getAdmin = async () => {
  const response = await axios.get(
    `${base_url}/api/v1/admin/current`,
    {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage}`,
        "Content-Type": "application/json"
      }
    }
  )
  return response.data;
}

const authService = {
  login,
  getOrders,
  getCustomerOrder,
  getRecentOrders,
  getAdmin,
  updateAdmin,
};

export default authService;
