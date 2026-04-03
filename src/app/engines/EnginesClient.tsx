"use client";

import { Wind, Settings, Search } from 'lucide-react';
import Link from 'next/link';
import { useState, useMemo } from 'react';

export default function EnginesClient({ initialEngines }: { initialEngines: any[] }) {
  const [q, setQ] = useState('');
  const [mfr, setMfr] = useState('');

  const engines = useMemo(() => {
    return initialEngines.filter(e => {
      if (q && !e.name.toLowerCase().includes(q.toLowerCase())) return false;
      if (mfr && e.manufacturer !== mfr) return false;
      return true;
    });
  }, [initialEngines, q, mfr]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Wind className="h-10 w-10 text-primary" /> Aircraft Powerplants
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Explore the sophisticated engineering marvels that power modern commercial aviation. Learn about their thrust, bypass ratios, and fuel efficiency.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="space-y-6">
          <div className="bg-card border border-white/5 p-6 rounded-2xl space-y-6 sticky top-24">
            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="e.g. Trent or LEAP"
                  className="w-full bg-background border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Manufacturer</label>
              <select value={mfr} onChange={(e) => setMfr(e.target.value)} className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary">
                <option value="">All Manufacturers</option>
                <option value="CFM International">CFM International</option>
                <option value="GE Aerospace">GE Aerospace</option>
                <option value="Rolls-Royce">Rolls-Royce</option>
                <option value="Pratt & Whitney">Pratt & Whitney</option>
                <option value="Pratt & Whitney Canada">Pratt & Whitney Canada</option>
              </select>
            </div>

            {(q || mfr) && (
              <button onClick={() => { setQ(''); setMfr(''); }} className="w-full block text-center text-sm text-muted-foreground hover:text-white mt-2">
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Grid */}
        <div className="lg:col-span-3">
          <div className="mb-6 flex justify-between items-center text-sm text-muted-foreground">
            <span>Showing {engines.length} engines</span>
          </div>

          {engines.length === 0 ? (
            <div className="text-center py-20 bg-card border border-white/5 rounded-2xl">
              <Settings className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-medium">No engines found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {engines.map((engine: any) => (
                <div key={engine.id} className="bg-card border border-white/5 rounded-2xl p-6 hover:border-primary/50 transition-colors shadow-lg flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{engine.name}</h2>
                      <p className="text-primary font-medium">{engine.manufacturer}</p>
                    </div>
                  </div>

                  <div className="space-y-4 flex-1">
                    <div className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-muted-foreground text-sm">Thrust</span>
                      <span className="font-semibold">{engine.thrustKn} kN</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-muted-foreground text-sm">Bypass Ratio</span>
                      <span className="font-semibold">{engine.bypassRatio}:1</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-muted-foreground text-sm">Fan Diameter</span>
                      <span className="font-semibold">{engine.fanDiameterM ? `${engine.fanDiameterM} m` : 'N/A'}</span>
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-white/5">
                    <span className="block text-muted-foreground text-sm mb-3">Equipped Aircraft:</span>
                    <div className="flex flex-wrap gap-2">
                      {engine.variants && engine.variants.length > 0 ? (
                        engine.variants.map((v: any) => (
                          <Link key={v.id} href={`/aircraft/${v.id}`} className="text-xs bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors font-medium">
                            {v.name}
                          </Link>
                        ))
                      ) : (
                        <span className="text-xs text-muted-foreground italic">Generic / Not specifically assigned</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
