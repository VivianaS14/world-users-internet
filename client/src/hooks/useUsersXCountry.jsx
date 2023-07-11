import { useCallback, useState } from "react";
import { api } from "../api/api";

export const useUsersXCountry = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUsersXCountry = useCallback(async (country, years) => {
    try {
      setError(null);
      const request = years.map(async (year) => {
        try {
          const response = await api.get(`country/${country}/year/${year}`);
          return {
            [year]: response.data.Data[country].internet_users_number,
          };
        } catch (error) {
          setError(error.message);
        }
      });
      const results = await Promise.all(request);
      setData([Object.assign({ country: country }, ...results)]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, getUsersXCountry };
};
