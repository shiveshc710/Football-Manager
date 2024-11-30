import axios from "axios";
import { API_URLS } from "@/app/constantURLs";

export const SignUpAPI = async (
  emailId: string,
  password: string,
  dateOfBirth: string,
  name: string,
  lastName: string,
  phoneNumber: string
) => {
  try {
    const data = {
      emailId,
      password,
      dateOfBirth,
      name,
      lastName,
      phoneNumber,
    };

    console.log("APIURLS.signup: ", API_URLS.signup);
    const response = await axios.post(API_URLS.signup, data);
    return response;
  } catch (error) {
    throw error;
  }
};
