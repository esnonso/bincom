import { useCallback, useState } from "react";
import axios from "axios";

const useApiCall = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        data: requestConfig.data ? requestConfig.data : null,
      });

      if (response.status !== 200) {
        throw new Error("Request failed!");
      }
      setIsLoading(false);
      applyData(response);
    } catch (error) {
      if (error.response !== undefined) {
        setError(error.response.data.error.message);
      } else {
        setError(
          "An error occured While Loding this Page, check your connection and try again"
        );
      }
      setIsLoading(false);
    }
  }, []);
  return {
    isLoading,
    error,
    sendRequest,
  };
};
export default useApiCall;
