"use client";

import { useState, useEffect } from 'react';
import { newPairs, finalStretch, migrated } from '@/lib/mock-data';
import { useMockPriceUpdates } from '@/hooks/use-mock-price-updates';
import { TokenTableSkeleton } from '@/components/token-table/token-table-skeleton';
import type { Token } from '@/lib/types';
import { TokenList } from '@/components/token-table/token-list';

export default function Home() {
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
    return (
        <div className="container relative py-8">
            <section className="mb-8">
                <h1 className="text-3xl font-bold">Pulse</h1>
            </section>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <TokenTableSkeleton />
                <TokenTableSkeleton />
                <TokenTableSkeleton />
            </div>
        </div>
    );
  }

  return (
    <div className="container relative py-8">
      <section className="mb-8">
        <h1 className="text-3xl font-bold">Pulse</h1>
      </section>
      
      <section className="grid w-full grid-cols-1 lg:grid-cols-3 gap-4">
         <div className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="p-4 border-b border-border">
                <h2 className="text-lg font-semibold">New Pairs</h2>
            </div>
            <TokenList data={getUpdatedData(newPairs)} />
         </div>
         <div className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="p-4 border-b border-border">
                <h2 className="text-lg font-semibold">Final Stretch</h2>
            </div>
            <TokenList data={getUpdatedData(finalStretch)} />
         </div>
         <div className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="p-4 border-b border-border">
                <h2 className="text-lg font-semibold">Migrated</h2>
            </div>
            <TokenList data={getUpdatedData(migrated)} />
         </div>
      </section>
    </div>
  );
}
