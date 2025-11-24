import type { Token } from './types';
import React from 'react';

const tokenTypes: Token['type'][] = ['pump', 'mayhem', 'virtual-curve', 'meteora'];

const generateRandomToken = (name: string, symbol: string, logo: string, age: string, priceMultiplier: number, isPumpFun: boolean, network: 'sol' | 'bnb'): Token => ({
  id: `${symbol}-${Math.random().toString(36).substring(7)}`,
  name,
  symbol,
  logo,
  price: parseFloat((Math.random() * 0.1 * priceMultiplier).toFixed(8)),
  priceChange24hPercent: (Math.random() - 0.5) * 40,
  volume24h: Math.floor(Math.random() * 50000) + 1000,
  liquidity: Math.floor(Math.random() * 200000) + 5000,
  fdv: Math.floor(Math.random() * 2000000) + 50000,
  age,
  marketCap: Math.floor(Math.random() * 500000) + 10000,
  transactions: {
    buys: Math.floor(Math.random() * 100),
    sells: Math.floor(Math.random() * 100),
  },
  socials: {
    twitter: "https://twitter.com",
    telegram: "https://telegram.org",
    website: "https://example.com",
  },
  creator: {
    pnl: (Math.random() - 0.5) * 100,
    pnlPercent: (Math.random() - 0.5) * 50,
  },
  holders: Math.floor(Math.random() * 200) + 1,
  proTraders: Math.floor(Math.random() * 20),
  topTraders: Math.floor(Math.random() * 10),
  vips: {
    current: Math.floor(Math.random() * 5),
    total: 5,
  },
  snipers: Math.floor(Math.random() * 30),
  bots: Math.floor(Math.random() * 20),
  boxes: Math.floor(Math.random() * 10),
  isPumpFun,
  type: tokenTypes[Math.floor(Math.random() * tokenTypes.length)],
  network,
});

export const newPairs: Token[] = [
  generateRandomToken('Axiom', 'AXM', 'https://picsum.photos/seed/1/68/68', '5m', 1, true, 'sol'),
  generateRandomToken('Zenith', 'ZTH', 'https://picsum.photos/seed/2/68/68', '12m', 1.2, true, 'bnb'),
  generateRandomToken('Nova', 'NVA', 'https://picsum.photos/seed/3/68/68', '25m', 0.8, false, 'sol'),
  generateRandomToken('Orion', 'ORN', 'https://picsum.photos/seed/4/68/68', '45m', 2, true, 'bnb'),
  generateRandomToken('Pulse', 'PLS', 'https://picsum.photos/seed/5/68/68', '1h', 0.5, false, 'sol'),
  generateRandomToken('Cosmo', 'CSM', 'https://picsum.photos/seed/6/68/68', '1h', 1.5, true, 'sol'),
  generateRandomToken('Vertex', 'VTX', 'https://picsum.photos/seed/7/68/68', '2h', 0.9, false, 'bnb'),
  generateRandomToken('Stellar', 'XLM', 'https://picsum.photos/seed/8/68/68', '3h', 3, true, 'sol'),
];

export const finalStretch: Token[] = [
  generateRandomToken('Apex', 'APX', 'https://picsum.photos/seed/9/68/68', '23h', 10, true, 'sol'),
  generateRandomToken('Legacy', 'LGC', 'https://picsum.photos/seed/10/68/68', '1d', 15, false, 'bnb'),
  generateRandomToken('Momentum', 'MTM', 'https://picsum.photos/seed/11/68/68', '1d', 8, true, 'sol'),
  generateRandomToken('Horizon', 'HZN', 'https://picsum.photos/seed/12/68/68', '2d', 12, false, 'bnb'),
];

export const migrated: Token[] = [
  generateRandomToken('OldCoin', 'OC', 'https://picsum.photos/seed/13/68/68', '3d', 0.1, false, 'sol'),
  generateRandomToken('Phoenix', 'PNX', 'https://picsum.photos/seed/14/68/68', '4d', 0.2, true, 'bnb'),
];
