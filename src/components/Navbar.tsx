import Link from 'next/link';
import { Plane } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="flex items-center gap-2 mr-6 text-xl font-bold text-primary">
          <Plane className="h-6 w-6" />
          <span>AeroDex</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium flex-1">
          <Link href="/aircraft" className="transition-colors hover:text-primary text-foreground/80">Aircraft</Link>
          <Link href="/engines" className="transition-colors hover:text-primary text-foreground/80">Engines</Link>
          <Link href="/compare" className="transition-colors hover:text-primary text-foreground/80">Compare</Link>
          <Link href="/route-calculator" className="transition-colors hover:text-primary text-foreground/80">Route Calc</Link>
        </nav>
      </div>
    </header>
  );
}
