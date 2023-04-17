import axios from "axios";

const tokenExists = false; // work on this later rich code
const authToken = ""; // from cookies - whatever 

const newRequest = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: "Application/json",
    "Content-Type": "Application/json",
    Authorization: tokenExists ? `Bearer ${authToken}` : null,
  },
});

export default newRequest;
