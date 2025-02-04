import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center space-y-7">
      <Image src={'/logo.png'} alt="Gifts Beauty" width={200} height={200} className="font-bold text-3xl font-[cursive] w-full max-w-sm" />
      <p className="text-3xl font-medium text-center font-[cursive]">Gift&apos;s Beauty Salon</p>
      <p className="text-sm font-medium">Accounting, Sales, and Product management.</p>
      <div className="space-x-4">
        <Button className="rounded-full" asChild>
          <Link href={'/dashboard'}>Get Started</Link>
        </Button>
        <Button className="rounded-full" variant={'outline'} asChild>
          <a href="https://merriam.vercel.app">Learn More</a>
        </Button>
      </div>
    </main>
  );
}
