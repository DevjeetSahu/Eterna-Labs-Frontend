"use client";

import { useState, useEffect } from 'react';
import { newPairs, finalStretch, migrated } from '@/lib/mock-data';
import { useMockPriceUpdates } from '@/hooks/use-mock-price-updates';
import { TokenTableSkeleton } from '@/components/token-table/token-table-skeleton';
import type { Token } from '@/lib/types';
import { TokenList } from '@/components/token-table/token-list';
import { PulseHeader } from '@/components/layout/pulse-header';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

export type Network = 'sol' | 'bnb';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [network, setNetwork] = useState<Network>('sol');

  const allInitialTokens = [...newPairs, ...finalStretch, ...migrated];
  const updatedTokens = useMockPriceUpdates(allInitialTokens);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate network delay
    return () => clearTimeout(timer);
  }, []);

  const getUpdatedData = (sourceData: Token[]) => {
      const filteredByNetwork = sourceData.filter(t => t.network === network);
      return filteredByNetwork.map(initialToken => 
        updatedTokens.find(updatedToken => updatedToken.id === initialToken.id) || initialToken
      );
  }

  return (
    <div className="relative flex h-screen min-h-dvh flex-col bg-background overflow-hidden">
      <SiteHeader network={network} setNetwork={setNetwork} />
      <main className="flex-1 flex flex-col min-h-0">
        <div className="container py-6 flex flex-col flex-1 min-h-0">
          <PulseHeader network={network} setNetwork={setNetwork} />

          {isLoading ? (
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0">
              <div className="rounded-lg border border-border bg-card overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h2 className="text-lg font-semibold">New Pairs</h2>
                </div>
                <TokenTableSkeleton />
              </div>
              <div className="rounded-lg border border-border bg-card overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h2 className="text-lg font-semibold">Final Stretch</h2>
                </div>
                <TokenTableSkeleton />
              </div>
              <div className="rounded-lg border border-border bg-card overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h2 className="text-lg font-semibold">Migrated</h2>
                </div>
                <TokenTableSkeleton />
              </div>
            </div>
          ) : (
            <section className="mt-4 grid w-full grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0">
              <div className="rounded-lg border border-border bg-card overflow-hidden flex flex-col">
                <TokenList
                  data={getUpdatedData(newPairs)}
                  title="New Pairs"
                  network={network}
                />
              </div>
              <div className="rounded-lg border border-border bg-card overflow-hidden flex flex-col">
                <TokenList
                  data={getUpdatedData(finalStretch)}
                  title="Final Stretch"
                  network={network}
                />
              </div>
              <div className="rounded-lg border border-border bg-card overflow-hidden flex flex-col">
                <TokenList
                  data={getUpdatedData(migrated)}
                  title="Migrated"
                  network={network}
                />
              </div>
            </section>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
