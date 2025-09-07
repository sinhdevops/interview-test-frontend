import { useQuery } from "@tanstack/react-query";

interface Token {
  currency: string;
  date: string;
  price: number;
}

const BASE_URL = "https://interview.switcheo.com/prices.json";

export const usePrices = () => {
  return useQuery({
    queryKey: ["get-prices"],
    queryFn: async (): Promise<Token[]> => {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch prices");
      }
      return response.json();
    },
    staleTime: 30000,
    refetchInterval: 60000,
  });
};
