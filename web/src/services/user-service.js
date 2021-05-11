import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/users/";

const UserContent = () => {
  return axios.get(API_URL, { headers: authHeader()});
};

const emailNotification = (emailId, data) => {
  return axios.post(API_URL+'email/' + emailId,{data: data }, { headers: authHeader()});
};

export default {
  UserContent,
  emailNotification
};