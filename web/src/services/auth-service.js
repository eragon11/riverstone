import axios from "axios";

const API_URL = "http://localhost:8000/api/users/";

const register = (username, email, password) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email_id: email,
      password,
    })
    .then((response) => {
      console.log(response);
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }

      return response.data.data;
    });
};

const logout = () => {
  console.log("logout function");
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

let authService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default authService;