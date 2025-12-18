import config from "@/constants/config";
import { useEffect, useState } from "react";

type Email = {
  id: number;
  to: string;
  subject: string;
  body: string;
};

const useEmailsLookup = (search?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Email[]>();

  async function refetch(search?: string) {
    try {
      setIsLoading(true);

      const queryParams = new URLSearchParams();
      if (search) {
        queryParams.set("search", search);
      }

      const queryString = queryParams.toString();
      const url = `${config.apiUrl}/emails${
        queryString ? `?${queryString}` : ""
      }`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const emails = await response.json();
      setData(emails);
    } catch (err) {
      console.error("Failed to fetch emails", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    refetch(search);
  }, [search]);

  return { isLoading, data, refetch };
};

export default useEmailsLookup;
