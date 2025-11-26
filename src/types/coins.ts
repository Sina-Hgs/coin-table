export interface Coin {
  id: string;
  symbol: string;
  name: string;
  price: number | string; // sometimes API returns string, sometimes number
  price_change_percentage_24h: number;
  logo_url: string;
}

export type Coins = Coin[];
