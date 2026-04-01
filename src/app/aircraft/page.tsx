import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { Plane, Search, Users } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function AircraftDirectory({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; mfr?: string; type?: string }>
}) {
  const resolvedParams = await searchParams;
  const q = resolvedParams.q || '';
  const mfr = resolvedParams.mfr || '';
  const type = resolvedParams.type || '';

  const whereClause: any = {};
  if (q) whereClause.name = { contains: q };
  if (mfr) whereClause.manufacturer = mfr;
  if (type) whereClause.type = type;

  const families = await prisma.aircraftFamily.findMany({
    where: whereClause,
    include: {
      variants: true,
    },
    orderBy: {
      name: 'asc'
    }
  });

  const totalVariants = families.reduce((acc, f) => acc + f.variants.length, 0);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Aircraft Families</h1>
        <p className="text-muted-foreground text-lg">Explore our comprehensive database of commercial aviation families.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="space-y-6">
          <form className="bg-card border border-white/5 p-6 rounded-2xl space-y-6 sticky top-24">
            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  name="q"
                  defaultValue={q}
                  placeholder="e.g. A320 Family"
                  className="w-full bg-background border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Manufacturer</label>
              <select name="mfr" defaultValue={mfr} className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary">
                <option value="">All Manufacturers</option>
                <option value="Airbus">Airbus</option>
                <option value="Boeing">Boeing</option>
                <option value="Embraer">Embraer</option>
                <option value="ATR">ATR</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Aircraft Type</label>
              <select name="type" defaultValue={type} className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary">
                <option value="">All Types</option>
                <option value="Narrow-body">Narrow-body</option>
                <option value="Wide-body">Wide-body</option>
                <option value="Regional">Regional</option>
              </select>
            </div>

            <button type="submit" className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Apply Filters
            </button>
            {(q || mfr || type) && (
              <Link href="/aircraft" className="block text-center text-sm text-muted-foreground hover:text-white mt-2">
                Clear Filters
              </Link>
            )}
          </form>
        </div>

        {/* Results Grid */}
        <div className="lg:col-span-3">
          <div className="mb-6 flex justify-between items-center text-sm text-muted-foreground">
            <span>Showing {families.length} families ({totalVariants} total aircraft variants)</span>
          </div>

          {families.length === 0 ? (
            <div className="text-center py-20 bg-card border border-white/5 rounded-2xl">
              <Plane className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-medium">No families found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {families.map((family) => {
                const coverImage = family.variants[0]?.imageUrl;
                
                return (
                  <Link href={`/aircraft/family/${family.id}`} key={family.id} className="group flex flex-col bg-card border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
                    <div className="relative h-48 w-full bg-muted">
                      {coverImage ? (
                        <Image 
                          src={coverImage} 
                          alt={family.name} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Plane className="h-8 w-8 text-muted-foreground/30" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="bg-background/80 backdrop-blur-md text-[10px] font-semibold px-2 py-0.5 rounded-full border border-white/10 uppercase tracking-wider">
                          {family.manufacturer}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{family.name}</h3>
                      <p className="text-muted-foreground text-xs mb-4">{family.type}</p>
                      
                      {family.description && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                          {family.description}
                        </p>
                      )}
                      
                      <div className="mt-auto pt-4 border-t border-white/5 text-xs text-foreground/80 flex justify-between">
                        <div className="flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5 text-primary" />
                          <span>{family.variants.length} Variants</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
