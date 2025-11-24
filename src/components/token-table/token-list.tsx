"use client";

import type { Token } from '@/lib/types';
import { TokenCard } from './token-card';
import { useSortableData } from '@/hooks/use-sortable-data';
import { ArrowUpDown, ArrowDown, ArrowUp, SlidersHorizontal, Flashlight, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';
import { BnbLogo, SolanaLogo } from '@/components/layout/pulse-header';
import type { Network } from '@/app/page';

interface TokenListProps {
  data: Token[];
  title: string;
  network: Network;
}

type SortKey = keyof Token;

export function TokenList({ data, title, network }: TokenListProps) {
  const [sortKey, setSortKey] = useState<SortKey>('age');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const { items, requestSort, sortConfig } = useSortableData(data, { key: sortKey, direction: sortDirection });

  const handleSort = (key: SortKey) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    requestSort(key);
    setSortKey(key);
    setSortDirection(direction);
  }

  const sortOptions: { key: SortKey, label: string }[] = [
    { key: 'age', label: 'Age' },
    { key: 'marketCap', label: 'Market Cap' },
    { key: 'volume24h', label: 'Volume (24h)' },
    { key: 'priceChange24hPercent', label: 'Price Change (24h)' },
    { key: 'price', label: 'Price' },
  ];

  const currentSortLabel = sortOptions.find(opt => opt.key === sortKey)?.label || 'Sort by';

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10 hidden sm:flex whitespace-nowrap flex-row w-full gap-3 min-h-[48px] justify-end items-center pr-3 pl-4 border-b border-border bg-card">
          <div className="flex flex-row items-center gap-4 flex-1">
              <span className="text-base font-medium flex-1">{title}</span>
          </div>
          <div className="flex flex-row items-center gap-3">
              <div className="hidden lg:block">
                  <div className="overflow-hidden whitespace-nowrap border font-normal border-input flex flex-row h-7 pl-1.5 gap-1.5 justify-start items-center rounded-full hover:bg-secondary/50 transition-colors duration-125 cursor-pointer">
                      <Zap className="h-3.5 w-3.5 text-muted-foreground" />
                      <div className="flex flex-1 sm:max-w-[32px] min-w-0">
                          <Input placeholder="0.0" className="text-xs w-full text-foreground placeholder:text-muted-foreground font-medium outline-none bg-transparent text-left h-auto p-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0" type="text" defaultValue="0" />
                      </div>
                      <div className="w-4 h-4">
                        {network === 'sol' ? <SolanaLogo /> : <BnbLogo />}
                      </div>
                      <div className="border-l border-input flex h-full pr-0.5 pl-0.5 gap-0.5 justify-center items-center cursor-pointer">
                          <Button variant="ghost" className="group w-6 h-6 rounded-sm text-xs p-0"><span className="text-muted-foreground group-hover:text-primary">P1</span></Button>
                          <Button variant="ghost" className="group w-6 h-6 rounded-sm text-xs p-0"><span className="text-muted-foreground group-hover:text-primary">P2</span></Button>
                          <Button variant="ghost" className="group w-6 h-6 rounded-sm text-xs p-0"><span className="text-muted-foreground group-hover:text-primary">P3</span></Button>
                      </div>
                  </div>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              </Button>
          </div>
      </div>
       <div className="flex sm:hidden items-center justify-between p-3 border-b border-border flex-none">
        <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs">
                  <ArrowUpDown className="h-3 w-3" />
                  <span>{currentSortLabel}</span>
                  {sortConfig?.direction === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuRadioGroup value={sortKey} onValueChange={(val) => handleSort(val as SortKey)}>
                  {sortOptions.map(option => (
                    <DropdownMenuRadioItem key={option.key} value={option.key}>{option.label}</DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" className="h-8 w-8">
                <SlidersHorizontal className="h-4 w-4" />
            </Button>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="">
          {items.map((token) => (
            <TokenCard key={token.id} token={token} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
