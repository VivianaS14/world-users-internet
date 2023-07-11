import { useState } from "react";
import { api } from "../api/api";

export const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [errorCountries, setErrorCountries] = useState(null);

  const getCountries = async () => {
    try {
      setErrorCountries(null);
      const request = await api.get("countries");
      const response = request.data;
      setCountries(response.Countries);
    } catch (error) {
      setErrorCountries(error.message);
    } finally {
      setLoadingCountries(false);
    }
  };

  return {
    countries,
    loadingCountries,
    errorCountries,
    getCountries,
  };
};
