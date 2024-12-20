import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(async (
    url,
    method = "GET",
    body = null,
    headers = {}
  ) => {
    setIsLoading(true);
    const httpAbortCtrl = new AbortController();
    activeHttpRequests.current.push = (httpAbortCtrl);
    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
        signal: httpAbortCtrl.signal
      });
      const responseData = await response.json();
      // want to remove only the successful request, would still want to retain those
      // requests that are being processed but are not yet successful/complete
      activeHttpRequests.current = activeHttpRequests.current.filter(
        reqCtrl => reqCtrl !== httpAbortCtrl
        )
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setIsLoading(false);
      return responseData;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      throw err;
    }

  }, []);

  const clearError = () => {
    setError(null);
  }

  useEffect(() => {
    // cleanup for removing incomplete http requests
    return () => {
        activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
    }
  }, [])
  
  return {
    isLoading, error, sendRequest, clearError
  }
};
