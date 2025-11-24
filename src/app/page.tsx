import { TokenTable } from "@/components/token-table/token-table";

export default function Home() {
  return (
    <div className="container relative">
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
            Axiom Pulse
        </h1>
        <span className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
            A pixel-perfect replica of Axiom Trade's token discovery table. Real-time token discovery and analysis.
        </span>
      </section>
      
      <section className="w-full">
         <TokenTable />
      </section>
    </div>
  );
}
