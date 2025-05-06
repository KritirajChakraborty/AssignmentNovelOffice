import axios from "axios";
import { useState, useEffect } from "react";

const BASE_URL = "https://v6.exchangerate-api.com/v6";

const useFetchData = (currentCurrency) => {
  const [rates, setRates] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/${
            import.meta.env.VITE_API_KEY
          }/latest/${currentCurrency}`
        );
        setRates(response.data.conversion_rates || {});
        setError(null);
      } catch (error) {
        console.error("Error fetching currency data:", error);
        setError({
          status: error.response?.status,
          message: error.response?.data?.message || error.message,
        });
        setRates({});
      } finally {
        setIsLoading(false);
      }
    };

    if (currentCurrency) {
      fetchData();
    }
  }, [currentCurrency]);

  return { rates, error, isLoading };
};

export default useFetchData;
