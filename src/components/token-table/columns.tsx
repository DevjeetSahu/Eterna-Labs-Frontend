"use client";

import type { ColumnDef, Token, SortConfig } from '@/lib/types';
import { ArrowDown, ArrowUp, HelpCircle, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 8 }).format(value);
};

const SortableHeader = ({
  children,
  sortConfig,
  sortKey,
  requestSort,
}: {
  children: React.ReactNode;
  sortConfig: SortConfig | null;
  sortKey: keyof Token;
  requestSort: (key: keyof Token) => void;
}) => (
  <Button variant="ghost" onClick={() => requestSort(sortKey)} className="text-xs p-0 h-auto hover:bg-transparent hover:text-foreground group">
    <span className='uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors'>{children}</span>
    {sortConfig?.key === sortKey && (
      sortConfig.direction === 'asc' ? <ArrowUp className="ml-2 h-3 w-3" /> : <ArrowDown className="ml-2 h-3 w-3" />
    )}
  </Button>
);

const PriceCell = ({ token }: { token: Token }) => {
    const priceChangeClass = token.priceUpdate === 'up' 
        ? 'bg-chart-3/20 dark:bg-chart-3/30' 
        : token.priceUpdate === 'down' 
        ? 'bg-destructive/10 dark:bg-destructive/20' 
        : '';
    return (
        <div className={cn('transition-colors duration-1000 px-4 -mx-4', priceChangeClass)}>
            {formatCurrency(token.price)}
        </div>
    );
};

export const getColumns = (requestSort: (key: keyof Token) => void, sortConfig: SortConfig | null): ColumnDef<Token>[] => [
  {
    accessorKey: 'name',
    header: <span className="text-xs uppercase tracking-wider text-muted-foreground">Token</span>,
    cell: ({ logo, name, symbol }) => (
      <div className="flex items-center gap-3">
        {logo}
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{name}</span>
          <span className="text-xs text-muted-foreground">{symbol}</span>
        </div>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'price',
    header: <SortableHeader sortConfig={sortConfig} sortKey="price" requestSort={requestSort}>Price</SortableHeader>,
    cell: (token) => <PriceCell token={token} />,
    enableSorting: true,
  },
  {
    accessorKey: 'priceChange24hPercent',
    header: <SortableHeader sortConfig={sortConfig} sortKey="priceChange24hPercent" requestSort={requestSort}>24h</SortableHeader>,
    cell: ({ priceChange24hPercent }) => (
      <span className={cn(priceChange24hPercent >= 0 ? 'text-chart-3' : 'text-destructive')}>
        {priceChange24hPercent.toFixed(2)}%
      </span>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'volume24h',
    header: <SortableHeader sortConfig={sortConfig} sortKey="volume24h" requestSort={requestSort}>Volume</SortableHeader>,
    cell: ({ volume24h }) => <span>{formatCurrency(volume24h)}</span>,
    enableSorting: true,
    hideOnMobile: true,
  },
  {
    accessorKey: 'liquidity',
    header: (
        <div className="flex items-center gap-1">
            <SortableHeader sortConfig={sortConfig} sortKey="liquidity" requestSort={requestSort}>Liquidity</SortableHeader>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <HelpCircle className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Total value of tokens in the liquidity pool.</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    ),
    cell: ({ liquidity }) => <span>{formatCurrency(liquidity)}</span>,
    enableSorting: true,
    hideOnMobile: true,
  },
  {
    accessorKey: 'fdv',
    header: <SortableHeader sortConfig={sortConfig} sortKey="fdv" requestSort={requestSort}>FDV</SortableHeader>,
    cell: ({ fdv }) => <span>{formatCurrency(fdv)}</span>,
    enableSorting: true,
    hideOnMobile: true,
  },
  {
    accessorKey: 'age',
    header: <SortableHeader sortConfig={sortConfig} sortKey="age" requestSort={requestSort}>Age</SortableHeader>,
    cell: ({ age }) => <span>{age}</span>,
    enableSorting: true,
  },
  {
    accessorKey: 'id', // use id for actions
    header: <span className="text-xs uppercase tracking-wider text-muted-foreground flex justify-end">Actions</span>,
    cell: () => (
      <div className="flex items-center justify-end gap-2">
         <Button size="sm" variant="default" className="h-8 px-3">
          Buy
        </Button>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground">
                <MoreVertical className="h-4 w-4" />
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>View Chart</DropdownMenuItem>
                <DropdownMenuItem>Token Details</DropdownMenuItem>
                <DropdownMenuItem>Share</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
    enableSorting: false,
  },
];
