import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import ExplainButton from '@/components/ExplainButton';
import { ArrowLeft, Calendar, Factory, Plane, Maximize, Gauge, Users, Wind } from 'lucide-react';

export default async function AircraftDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const aircraft = await prisma.variant.findUnique({
    where: { id: resolvedParams.id },
    include: {
      family: true,
      performance: true,
      dimensions: true,
      engines: true,
    }
  });

  if (!aircraft) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Detail Hero banner */}
      <div className="relative h-[40vh] w-full bg-muted">
        {aircraft.imageUrl && (
          <Image 
            src={aircraft.imageUrl} 
            alt={aircraft.name} 
            fill 
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full container mx-auto px-4 pb-8">
          <Link href="/aircraft" className="inline-flex items-center text-sm font-medium text-foreground/80 hover:text-white transition-colors mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Directory
          </Link>
          <div className="flex flex-wrap items-center gap-4 mb-2">
            <span className="bg-primary/90 text-primary-foreground backdrop-blur-md text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              {aircraft.family.manufacturer}
            </span>
            <span className="bg-white/10 text-white backdrop-blur-md text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-white/20">
              {aircraft.family.type}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">{aircraft.name}</h1>
          <p className="text-xl text-muted-foreground mt-2">{aircraft.family.name} Family</p>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Section */}
            <section className="bg-card border border-white/5 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Plane className="h-6 w-6 text-primary" /> Overview
              </h2>
              <p className="text-foreground/80 leading-relaxed text-lg mb-8">
                {aircraft.family.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-white/5">
                <div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2 mb-1"><Factory className="h-4 w-4"/> Manufacturer</div>
                  <div className="font-semibold">{aircraft.family.manufacturer}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2 mb-1"><Calendar className="h-4 w-4"/> First Flight</div>
                  <div className="font-semibold">{aircraft.firstFlightYear || 'TBA'}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2 mb-1"><Plane className="h-4 w-4"/> Class</div>
                  <div className="font-semibold">{aircraft.family.type}</div>
                </div>
              </div>
            </section>

            {/* AI Explainer */}
            <ExplainButton aircraftId={aircraft.id} aircraftName={aircraft.name} />

            {/* Performance */}
            {aircraft.performance && (
              <section className="bg-card border border-white/5 rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Gauge className="h-6 w-6 text-primary" /> Performance Data
                </h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
                  <div className="bg-background/50 border border-white/5 rounded-xl p-4 md:p-5 text-center">
                    <div className="text-muted-foreground text-xs md:text-sm mb-2">Cruise Speed</div>
                    <div className="text-2xl md:text-3xl font-bold text-primary">{aircraft.performance.cruiseSpeedKmh} <span className="text-xs md:text-sm font-normal text-muted-foreground">km/h</span></div>
                    <div className="text-[10px] md:text-xs text-foreground/50 mt-1">{aircraft.performance.cruiseSpeedKnots} knots</div>
                  </div>
                  
                  <div className="bg-background/50 border border-white/5 rounded-xl p-4 md:p-5 text-center">
                    <div className="text-muted-foreground text-xs md:text-sm mb-2">Maximum Range</div>
                    <div className="text-2xl md:text-3xl font-bold text-primary">{aircraft.performance.rangeKm?.toLocaleString()} <span className="text-xs md:text-sm font-normal text-muted-foreground">km</span></div>
                    <div className="text-[10px] md:text-xs text-foreground/50 mt-1">{Math.round((aircraft.performance.rangeKm || 0) * 0.539957).toLocaleString()} NM</div>
                  </div>

                  <div className="bg-background/50 border border-white/5 rounded-xl p-4 md:p-5 text-center">
                    <div className="text-muted-foreground text-xs md:text-sm mb-2">Cruising Alt.</div>
                    <div className="text-2xl md:text-3xl font-bold text-primary">{aircraft.performance.cruisingAltitudeFt ? (aircraft.performance.cruisingAltitudeFt / 1000).toFixed(0) + 'k ' : '? '} <span className="text-xs md:text-sm font-normal text-muted-foreground">ft</span></div>
                  </div>

                  <div className="bg-background/50 border border-white/5 rounded-xl p-4 md:p-5 text-center">
                    <div className="text-muted-foreground text-xs md:text-sm mb-2">Typ. Capacity</div>
                    <div className="text-2xl md:text-3xl font-bold text-primary">{aircraft.performance.capacity} <span className="text-xs md:text-sm font-normal text-muted-foreground">pax</span></div>
                  </div>
                </div>
              </section>
            )}
          </div>

          <div className="space-y-8">
            {/* Dimensions */}
            {aircraft.dimensions && (
              <section className="bg-card border border-white/5 rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Maximize className="h-5 w-5 text-primary" /> Dimensions
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <span className="text-muted-foreground">Length</span>
                    <span className="font-semibold">{aircraft.dimensions.lengthM} m</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <span className="text-muted-foreground">Wingspan</span>
                    <span className="font-semibold">{aircraft.dimensions.wingspanM} m</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-muted-foreground">Height</span>
                    <span className="font-semibold">{aircraft.dimensions.heightM} m</span>
                  </div>
                </div>
              </section>
            )}

            {/* Engines */}
            {aircraft.engines && aircraft.engines.length > 0 && (
              <section className="bg-card border border-white/5 rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Wind className="h-5 w-5 text-primary" /> Powerplant
                </h2>
                
                <div className="space-y-6">
                  {aircraft.engines.map((engine: any) => (
                    <div key={engine.id} className="bg-background/50 border border-white/5 rounded-xl p-5">
                      <div className="font-bold text-lg mb-1">{engine.name}</div>
                      <div className="text-sm text-primary mb-4">{engine.manufacturer}</div>
                      
                      <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm">
                        <div className="text-muted-foreground">Thrust:</div>
                        <div className="font-medium text-right">{engine.thrustKn} kN</div>
                        
                        <div className="text-muted-foreground">Bypass Ratio:</div>
                        <div className="font-medium text-right">{engine.bypassRatio}:1</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
