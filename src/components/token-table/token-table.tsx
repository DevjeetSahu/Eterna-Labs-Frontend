"use client";

import { useState, useEffect } from 'react';
import { newPairs, finalStretch, migrated } from '@/lib/mock-data';
import { useMockPriceUpdates } from '@/hooks/use-mock-price-updates';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TokenTableSkeleton } from './token-table-skeleton';
import type { Token } from '@/lib/types';
import { TokenList } from './token-list';

export function TokenTable() {
  const [isLoading, setIsLoading] = useState(true);

  const allInitialTokens = [...newPairs, ...finalStretch, ...migrated];
  const updatedTokens = useMockPriceUpdates(allInitialTokens);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate network delay
    return () => clearTimeout(timer);
  }, []);

  const getUpdatedData = (sourceData: Token[]) => {
      return sourceData.map(initialToken => 
        updatedTokens.find(updatedToken => updatedToken.id === initialToken.id) || initialToken
      );
  }

  if (isLoading) {
    return <TokenTableSkeleton />;
  }

  return (
    <Tabs defaultValue="new_pairs" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-secondary p-1 h-auto rounded-lg">
        <TabsTrigger value="new_pairs" className="text-muted-foreground data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md">New Pairs</TabsTrigger>
        <TabsTrigger value="final_stretch" className="text-muted-foreground data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md">Final Stretch</TabsTrigger>
        <TabsTrigger value="migrated" className="text-muted-foreground data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md">Migrated</TabsTrigger>
      </TabsList>
      <div className="rounded-lg border border-border bg-card overflow-hidden mt-4">
        <TabsContent value="new_pairs" className="mt-0">
            <TokenList data={getUpdatedData(newPairs)} />
        </TabsContent>
        <TabsContent value="final_stretch" className="mt-0">
            <TokenList data={getUpdatedData(finalStretch)} />
        </TabsContent>
        <TabsContent value="migrated" className="mt-0">
            <TokenList data={getUpdatedData(migrated)} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
