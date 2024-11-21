import { useState, useEffect } from "react";
import axios from "axios";

export default function usePastSearchData(userId) {
  const [pastSearchedData, setPastSearchedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPastSearchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/api/v1/past-search/get-past-search/${userId}`
      );
      if (data && data.success) {
        setPastSearchedData(data.pastSearchResults);
      }
    } catch (err) {
      console.error("Error fetching past searches:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchPastSearchData();
  }, [userId]);

  return { pastSearchedData, loading, error };
}
