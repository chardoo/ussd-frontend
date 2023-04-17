import axios from "axios";

const tokenExists = false; // work on this later rich code
const authToken = ""; // from cookies - whatever 

const newRequest = axios.create({
  baseURL: "https://z5anzvah2w.us-east-1.awsapprunner.com",
  withCredentials: false,
  headers: {
    Accept: "Application/json",
    "Content-Type": "Application/json",
    Authorization: tokenExists ? `Bearer ${authToken}` : null,
  },
});

export default newRequest;
