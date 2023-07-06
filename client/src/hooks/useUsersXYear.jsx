import { useCallback, useState } from "react";
import { api } from "../api/api";
import { formatValue } from "../utils/formatValue";

export const useUsersXYear = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUsersXYear = useCallback(async (years) => {
    try {
      setLoading(true);
      setError(null);
      const requests = years.map(async (year) => {
        try {
          const response = await api.get(`internet-users/${year}`);
          return {
            id: year,
            label: year,
            value: response.data.Data.Total,
            formattedValue: formatValue(response.data.Data.Total),
          };
        } catch (error) {
          setError(error.message);
        }
      });
      const results = await Promise.all(requests);
      setData(results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, getUsersXYear };
};
