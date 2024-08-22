import { useState } from "react";
import useAuthContext from "./useAuthContext";
import axios from "axios";

const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (firstName, lastName, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );

      // Since axios already parses the response, no need to call .json()
      const json = response.data;
      if (json) {
        // Save the user to local storage
        // localStorage.setItem("user", JSON.stringify(json));
        localStorage.setItem("token", json.token);

        // Update the auth context
        dispatch({ type: "LOGIN", payload: { token: json.token } });
        //dispatch({ type: "LOGIN", payload: json });
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
export default useSignUp;
