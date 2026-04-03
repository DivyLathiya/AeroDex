import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { Plane, Gauge, Ruler, ArrowLeft, ArrowUp, Users } from 'lucide-react';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const families = await prisma.aircraftFamily.findMany({ select: { id: true } });
  return families.map((family) => ({ id: family.id }));
}
export default async function FamilyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const family = await prisma.aircraftFamily.findUnique({
    where: { id: resolvedParams.id },
    include: {
      variants: {
        include: {
          performance: true,
        },
        orderBy: { name: 'asc' }
      }
    }
  });

  if (!family) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/aircraft" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Families
      </Link>
      
      <div className="mb-12">
        <div className="inline-block bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4">
          {family.manufacturer} • {family.type}
        </div>
        <h1 className="text-4xl font-bold mb-4">{family.name}</h1>
        <p className="text-muted-foreground text-lg max-w-3xl">{family.description || 'Explore the variants within this aircraft family.'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {family.variants.map((item: any) => (
          <Link href={`/aircraft/${item.id}`} key={item.id} className="group flex flex-col bg-card border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
            <div className="relative h-48 w-full bg-muted">
              {item.imageUrl ? (
                <Image 
                  src={item.imageUrl} 
                  alt={item.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Plane className="h-8 w-8 text-muted-foreground/30" />
                </div>
              )}
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{item.name}</h3>
              <p className="text-muted-foreground text-xs mb-4">First Flight: {item.firstFlightYear || 'TBA'}</p>
              
              <div className="grid grid-cols-2 gap-3 gap-y-4 mt-auto pt-4 border-t border-white/5 text-xs text-foreground/80">
                <div className="flex items-center gap-1.5">
                  <Gauge className="h-3.5 w-3.5 text-primary" />
                  <span className="truncate">{item.performance?.cruiseSpeedKmh || '?'} km/h ({Math.round((item.performance?.cruiseSpeedKmh || 0) * 0.539957)} kts)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Ruler className="h-3.5 w-3.5 text-primary" />
                  <span className="truncate">{item.performance?.rangeKm?.toLocaleString() || '?'} km ({Math.round((item.performance?.rangeKm || 0) * 0.539957).toLocaleString()} NM)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ArrowUp className="h-3.5 w-3.5 text-primary" />
                  <span className="truncate">{item.performance?.cruisingAltitudeFt ? `${(item.performance.cruisingAltitudeFt / 1000).toFixed(0)}k ft` : '?'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-primary" />
                  <span className="truncate">{item.performance?.capacity || '?'} pax</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {family.variants.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            No variants currently documented for this family.
          </div>
        )}
      </div>
    </div>
  );
}
