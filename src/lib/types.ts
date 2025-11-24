import type { ReactNode } from 'react';

export type Token = {
  id: string;
  name: string;
  symbol: string;
  logo: ReactNode;
  price: number;
  priceChange24hPercent: number;
  volume24h: number;
  liquidity: number;
  fdv: number; // Fully Diluted Valuation
  age: string; // e.g., "5m", "2h", "1d"
  priceUpdate?: 'up' | 'down';
};

export type SortDirection = 'asc' | 'desc';
export type SortConfig = {
  key: keyof Token | null;
  direction: SortDirection;
};

export type ColumnDef<T> = {
  accessorKey: keyof T | 'id';
  header: ReactNode;
  cell: (item: T) => ReactNode;
  enableSorting?: boolean;
  hideOnMobile?: boolean;
};
