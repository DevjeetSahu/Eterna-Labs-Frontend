"use client";

import { useMemo, useState, useEffect } from 'react';
import { useSortableData } from '@/hooks/use-sortable-data';
import type { Token } from '@/lib/types';
import { getColumns } from './columns';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { TokenChart } from './token-chart';

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DialogTrigger } from '@radix-ui/react-dialog';


interface DataTableProps {
  data: Token[];
}

// Helper function needed in this file for Dialog
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 8 }).format(value);
};


export function DataTable({ data }: DataTableProps) {
  const { items, requestSort, sortConfig } = useSortableData(data, { key: 'age', direction: 'asc' });
  const allColumns = useMemo(() => getColumns(requestSort, sortConfig), [requestSort, sortConfig, data]);
  
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const isMobile = useIsMobile();
  
  const columns = useMemo(() => {
    if (!isClient) {
      return allColumns.filter(c => !c.hideOnMobile); // Best guess for server render
    }
    return isMobile ? allColumns.filter(c => !c.hideOnMobile) : allColumns;
  }, [isMobile, allColumns, isClient]);

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent border-b-border">
          {columns.map((column, index) => (
            <TableHead key={String(column.accessorKey) + index} className={cn(index === 0 ? 'w-[25%] md:w-[20%]' : '', column.accessorKey === 'id' ? 'text-right' : '')}>
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((token) => (
          <Dialog key={token.id}>
             <DialogTrigger asChild>
                <TableRow className="cursor-pointer">
                    {columns.map((column, index) => (
                        <TableCell key={String(column.accessorKey) + index} className="text-sm font-medium py-4">
                        {column.cell(token)}
                        </TableCell>
                    ))}
                </TableRow>
             </DialogTrigger>
             <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">{token.logo} {token.name} ({token.symbol})</DialogTitle>
                </DialogHeader>
                <div className="py-4 text-sm space-y-4">
                  <TokenChart token={token} />
                  <div className="grid grid-cols-2 gap-4">
                      <div><span className="font-medium text-muted-foreground">Price:</span> {formatCurrency(token.price)}</div>
                      <div><span className="font-medium text-muted-foreground">24h %:</span> <span className={cn(token.priceChange24hPercent >= 0 ? 'text-chart-3' : 'text-destructive')}>{token.priceChange24hPercent.toFixed(2)}%</span></div>
                      <div><span className="font-medium text-muted-foreground">Volume:</span> {formatCurrency(token.volume24h)}</div>
                      <div><span className="font-medium text-muted-foreground">Liquidity:</span> {formatCurrency(token.liquidity)}</div>
                      <div><span className="font-medium text-muted-foreground">FDV:</span> {formatCurrency(token.fdv)}</div>
                      <div><span className="font-medium text-muted-foreground">Age:</span> {token.age}</div>
                  </div>
                </div>
             </DialogContent>
          </Dialog>
        ))}
      </TableBody>
    </Table>
  );
}
