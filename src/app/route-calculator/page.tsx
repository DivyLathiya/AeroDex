'use client';

import { useState } from 'react';
import { PlaneTakeoff, PlaneLanding, Navigation, Loader2 } from 'lucide-react';

export default function RouteCalculatorPage() {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [speed, setSpeed] = useState('850');
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const calculateRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!departure || !arrival) return;

    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/ai/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ departure, arrival, aircraftSpeedKmh: parseInt(speed) })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-[80vh]">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Flight Route Calculator</h1>
          <p className="text-muted-foreground">
            Estimate flight times between any two airports based on aircraft cruising speed and simulated wind effects.
          </p>
        </div>

        <form onSubmit={calculateRoute} className="bg-card border border-white/5 rounded-2xl p-8 shadow-2xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-sm font-medium mb-2 block text-muted-foreground">Departure Airport (IATA)</label>
              <div className="relative">
                <PlaneTakeoff className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                <input 
                  type="text" 
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value.toUpperCase())}
                  placeholder="e.g. JFK or LHR"
                  maxLength={3}
                  required
                  className="w-full bg-background border border-white/10 rounded-lg pl-10 pr-4 py-3 text-lg font-mono focus:outline-none focus:ring-2 focus:ring-primary uppercase"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block text-muted-foreground">Arrival Airport (IATA)</label>
              <div className="relative">
                <PlaneLanding className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                <input 
                  type="text" 
                  value={arrival}
                  onChange={(e) => setArrival(e.target.value.toUpperCase())}
                  placeholder="e.g. DXB or SIN"
                  maxLength={3}
                  required
                  className="w-full bg-background border border-white/10 rounded-lg pl-10 pr-4 py-3 text-lg font-mono focus:outline-none focus:ring-2 focus:ring-primary uppercase"
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label className="text-sm font-medium mb-2 block text-muted-foreground">Aircraft Cruise Speed (km/h)</label>
            <input 
              type="number" 
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading || !departure || !arrival}
            className="w-full bg-primary text-primary-foreground font-bold text-lg py-4 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Navigation className="h-6 w-6" />}
            {loading ? 'Calculating...' : 'Calculate Flight'}
          </button>
        </form>

        {result && !result.error && (
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-bold mb-6 text-center">{result.route}</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-background/80 rounded-xl p-4 text-center border border-white/5">
                <div className="text-sm text-muted-foreground mb-1">Distance</div>
                <div className="text-2xl font-bold text-primary">{result.distanceKm.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">km</span></div>
              </div>
              
              <div className="bg-background/80 rounded-xl p-4 text-center border border-white/5">
                <div className="text-sm text-muted-foreground mb-1">Est. Flight Time</div>
                <div className="text-2xl font-bold text-primary">{result.estimatedFlightTime}</div>
              </div>
              
              <div className="bg-background/80 rounded-xl p-4 text-center border border-white/5">
                <div className="text-sm text-muted-foreground mb-1">Wind Effect</div>
                <div className="text-lg font-semibold text-secondary-foreground mt-1">{result.windEffect}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
