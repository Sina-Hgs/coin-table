import { useQuery } from "@tanstack/react-query";
import api from "../services/axios";
import type { Coins, Coin } from "../types/coins";

export const useGetData = (search?: string) => {
  return useQuery<Coins>({
    queryKey: ["coingeckoData"], // static key, only one API call
    queryFn: async () => {
      const { data } = await api.get(
        "/nainemom/58aa9fdfb0821bd791a16770632cb218/raw/2a72d0ffa0f62dd36b9a3c67997018ca667c1a2d/coingecko_coins.json"
      );
      return data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
    select: (data: Coins) => {
      if (!search) return data;

      const normalized = search.toLowerCase();
      return data.filter(
        (coin: Coin) =>
          coin.name.toLowerCase().includes(normalized) ||
          coin.symbol.toLowerCase().includes(normalized)
      );
    },
  });
};
