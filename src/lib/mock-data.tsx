import { TokenAxiom, TokenZenith, TokenNova, TokenOrion, TokenPulse } from '@/components/icons/token-logos';
import type { Token } from './types';
import React from 'react';

const generateRandomToken = (name: string, symbol: string, logo: React.ReactNode, age: string, priceMultiplier: number): Token => ({
  id: symbol,
  name,
  symbol,
  logo,
  price: parseFloat((Math.random() * 0.1 * priceMultiplier).toFixed(8)),
  priceChange24hPercent: (Math.random() - 0.5) * 20,
  volume24h: Math.floor(Math.random() * 500000) + 10000,
  liquidity: Math.floor(Math.random() * 200000) + 5000,
  fdv: Math.floor(Math.random() * 2000000) + 50000,
  age,
});

export const newPairs: Token[] = [
  generateRandomToken('Axiom', 'AXM', <TokenAxiom />, '5m', 1),
  generateRandomToken('Zenith', 'ZTH', <TokenZenith />, '12m', 1.2),
  generateRandomToken('Nova', 'NVA', <TokenNova />, '25m', 0.8),
  generateRandomToken('Orion', 'ORN', <TokenOrion />, '45m', 2),
  generateRandomToken('Pulse', 'PLS', <TokenPulse />, '1h', 0.5),
  generateRandomToken('Cosmo', 'CSM', <TokenAxiom />, '1h', 1.5),
  generateRandomToken('Vertex', 'VTX', <TokenZenith />, '2h', 0.9),
  generateRandomToken('Stellar', 'XLM', <TokenNova />, '3h', 3),
];

export const finalStretch: Token[] = [
  generateRandomToken('Apex', 'APX', <TokenOrion />, '23h', 10),
  generateRandomToken('Legacy', 'LGC', <TokenPulse />, '1d', 15),
  generateRandomToken('Momentum', 'MTM', <TokenAxiom />, '1d', 8),
  generateRandomToken('Horizon', 'HZN', <TokenZenith />, '2d', 12),
];

export const migrated: Token[] = [
  generateRandomToken('OldCoin', 'OC', <TokenNova />, '3d', 0.1),
  generateRandomToken('Phoenix', 'PNX', <TokenOrion />, '4d', 0.2),
];
