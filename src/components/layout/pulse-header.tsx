"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { HelpCircle, List, BookmarkX, Keyboard, Volume2, Crosshair, Settings, Wallet, ArrowDown } from "lucide-react"
import Image from "next/image"
import type { Network } from "@/app/page";
import { cn } from "@/lib/utils";

export const SolanaLogo = () => (
    <Image alt="SOL" loading="lazy" width="20" height="20" src="https://axiom.trade/images/sol-fill.svg" />
)

export const BnbLogo = () => (
    <Image alt="BNB" loading="lazy" width="20" height="20" className="grayscale-[0.3]" src="https://axiom.trade/images/bnb-fill.svg" />
)

interface PulseHeaderProps {
    network: Network;
    setNetwork: (network: Network) => void;
}

export const PulseHeader = ({ network, setNetwork }: PulseHeaderProps) => {
    return (
        <section className="flex-none flex flex-row w-full h-[32px] justify-start items-center">
            <div className="flex-1 flex items-center gap-3">
                <span className="text-foreground text-[20px] font-medium">Pulse</span>
                <div className="flex items-center gap-1">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className={cn(
                            "relative flex items-center justify-center w-[32px] h-[32px] rounded-full transition-all duration-150",
                            network === 'sol' ? "bg-secondary/60 scale-110" : "opacity-60 hover:opacity-100 hover:bg-secondary/30"
                        )} 
                        aria-label="Switch to Solana"
                        onClick={() => setNetwork('sol')}
                    >
                        <SolanaLogo />
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className={cn(
                            "relative flex items-center justify-center w-[32px] h-[32px] rounded-full transition-all duration-150",
                             network === 'bnb' ? "bg-secondary/60 scale-110" : "opacity-60 hover:opacity-100 hover:bg-secondary/30"
                        )} 
                        aria-label="Switch to BNB"
                        onClick={() => setNetwork('bnb')}
                    >
                        <BnbLogo />
                    </Button>
                </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
                <Button variant="ghost" size="icon" className="flex flex-row w-[24px] h-[24px] justify-center items-center text-muted-foreground hover:text-foreground">
                    <HelpCircle className="h-5 w-5" />
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" className="h-8">
                            <List className="h-4 w-4 mr-2" />
                            <span className="text-sm font-bold">Display</span>
                            <ArrowDown className="h-4 w-4 ml-2" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {/* Dropdown items here */}
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="ghost" size="icon" className="group -mr-1 text-muted-foreground hover:text-foreground">
                    <BookmarkX className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="group -mr-1 text-muted-foreground hover:text-foreground">
                    <Keyboard className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="group -mr-1 text-muted-foreground hover:text-foreground">
                    <Volume2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="group relative text-muted-foreground hover:text-foreground">
                    <Crosshair className="h-4 w-4" />
                    <Settings className="h-3 w-3 absolute bottom-0 right-0" />
                </Button>
                
                <div className="relative flex ">
                    <Button variant="outline" className="h-8 rounded-full">
                        <Wallet className="h-4 w-4 mr-2" />
                        <span>1</span>
                        <div className='w-5 h-5'>
                          <SolanaLogo />
                        </div>
                        <span className="ml-1">0</span>
                        <ArrowDown className="h-4 w-4 ml-1" />
                    </Button>
                </div>

                 <div className="hidden sm:block lg:hidden">
                    {/* Empty for now as per image */}
                 </div>
            </div>
        </section>
    )
}
