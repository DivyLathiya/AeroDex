import Image from 'next/image';
import Link from 'next/link';
import SearchInput from '@/components/SearchInput';
import prisma from '@/lib/prisma';
import { Plane, ArrowRight, Gauge, Ruler } from 'lucide-react';

async function getFeaturedAircraft() {
  const featured = await prisma.variant.findMany({
    take: 3,
    include: {
      family: true,
      performance: true,
    },
    orderBy: {
      firstFlightYear: 'desc'
    }
  });
  return featured;
}

export default async function Home() {
  const featuredAircraft = await getFeaturedAircraft();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=2674"
            alt="AeroDex Hero"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Plane className="h-4 w-4" />
            <span>Aircraft Intelligence Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
            Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Skies</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            The ultimate database for commercial aviation enthusiasts. Compare aircraft specs, engine details, and performance data.
          </p>

          <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
            <SearchInput />
          </div>
        </div>
      </section>

      {/* Featured Aircraft Section */}
      <section className="py-24 px-4 container mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold">Featured Aircraft</h2>
            <p className="text-muted-foreground mt-2">Discover modern marvels of engineering</p>
          </div>
          <Link href="/aircraft" className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredAircraft.map((feature: any) => (
            <Link href={`/aircraft/${feature.id}`} key={feature.id} className="group flex flex-col bg-card border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
              <div className="relative h-64 w-full overflow-hidden bg-muted">
                {feature.imageUrl ? (
                  <Image 
                    src={feature.imageUrl} 
                    alt={feature.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Plane className="h-10 w-10 text-muted-foreground/30" />
                  </div>
                )}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-background/80 backdrop-blur-md text-xs font-semibold px-2.5 py-1 rounded-full border border-white/10">
                    {feature.family.manufacturer}
                  </span>
                  <span className="bg-primary/90 text-primary-foreground backdrop-blur-md text-xs font-semibold px-2.5 py-1 rounded-full">
                    {feature.family.type}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{feature.name}</h3>
                    <p className="text-muted-foreground text-sm">{feature.family.name}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-auto pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 text-sm text-foreground/80">
                    <Gauge className="h-4 w-4 text-primary" />
                    <span>{feature.performance?.cruiseSpeedKmh || '?'} km/h</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground/80">
                    <Ruler className="h-4 w-4 text-primary" />
                    <span>{feature.performance?.rangeKm?.toLocaleString() || '?'} km</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
