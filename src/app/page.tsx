import { TokenTable } from "@/components/token-table/token-table";

export default function Home() {
  return (
    <div className="container relative py-8">
      <section className="mb-8">
        <h1 className="text-3xl font-bold">Pulse</h1>
      </section>
      
      <section className="w-full">
         <TokenTable />
      </section>
    </div>
  );
}
