import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { getTokenFromLocalStorage } from "../../utils/axiosconfig";

const getUsers = async (filters) => {
  const response = await axios.get(
    `${base_url}/api/v1/customer/all${filters}`, 
    {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage}`,
        "Content-Type": "application/json"
      }
    }
  )
  return response.data;
}
const customerService = {
  getUsers,
};

export default customerService;
