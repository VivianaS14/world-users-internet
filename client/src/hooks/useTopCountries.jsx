import { useCallback, useState } from "react";
import { api } from "../api/api";

export const useTopCountries = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCountries = useCallback(async (year) => {
    try {
      setError(null);
      const request = await api.get(`year/${year}`);
      const response = request.data;
      filterTopTen(response.Data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const filterTopTen = (data) => {
    const values = Object.values(data);
    values.sort(
      (a, b) => b.internet_users_percentatge - a.internet_users_percentatge
    );
    const maximus = values.slice(0, 10);
    const top = [];
    for (const prop in data) {
      if (
        maximus.find(
          (item) =>
            item.internet_users_percentatge ===
            data[prop].internet_users_percentatge
        )
      ) {
        top.push({
          id: prop,
          data: [
            {
              x: "Users",
              y: data[prop].internet_users_percentatge,
            },
          ],
        });
      }
    }
    setData(top);
  };

  return { data, error, loading, getCountries };
};
