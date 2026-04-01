'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plane } from 'lucide-react';

interface AircraftData {
  id: string;
  name: string;
  imageUrl?: string | null;
  firstFlightYear?: number | null;
  family?: any;
  performance?: any;
  dimensions?: any;
  engines?: any[];
}

export default function CompareTool({ aircraftData }: { aircraftData: AircraftData[] }) {
  const [selected1, setSelected1] = useState<AircraftData | null>(aircraftData[0] || null);
  const [selected2, setSelected2] = useState<AircraftData | null>(aircraftData[1] || null);

  const SpecRow = ({ label, value1, value2, higherIsBetter = true }: { label: string, value1: any, value2: any, higherIsBetter?: boolean }) => {
    const v1Num = parseFloat((value1 || '0').toString().replace(/[^0-9.]/g, ''));
    const v2Num = parseFloat((value2 || '0').toString().replace(/[^0-9.]/g, ''));
    
    let color1 = '';
    let color2 = '';
    
    if (v1Num > v2Num) {
      color1 = higherIsBetter ? 'text-green-500 font-bold' : 'text-red-400';
      color2 = higherIsBetter ? 'text-foreground/80' : 'text-green-500 font-bold';
    } else if (v2Num > v1Num) {
      color2 = higherIsBetter ? 'text-green-500 font-bold' : 'text-red-400';
      color1 = higherIsBetter ? 'text-foreground/80' : 'text-green-500 font-bold';
    } else {
      color1 = 'text-foreground/80';
      color2 = 'text-foreground/80';
    }

    return (
      <div className="grid grid-cols-3 py-4 border-b border-white/5 items-center">
        <div className="text-muted-foreground font-medium">{label}</div>
        <div className={`text-center ${color1}`}>{value1 || '-'}</div>
        <div className={`text-center ${color2}`}>{value2 || '-'}</div>
      </div>
    );
  };

  return (
    <div className="bg-card border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
      <div className="grid grid-cols-3 p-6 bg-background/50 border-b border-white/5 items-end gap-6">
        <div className="pb-2">
          <h2 className="text-xl font-bold">Comparison</h2>
          <p className="text-sm text-muted-foreground">Select aircraft to compare</p>
        </div>
        
        {/* Selector 1 */}
        <div>
          <select 
            className="w-full bg-background border border-white/20 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
            value={selected1?.id || ''}
            onChange={(e) => setSelected1(aircraftData.find(a => a.id === e.target.value) || null)}
          >
            {aircraftData.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
          {selected1 && (
            <div className="mt-4 relative h-32 w-full rounded-xl overflow-hidden bg-muted">
              {selected1.imageUrl ? 
                <Image src={selected1.imageUrl} alt={selected1.name} fill className="object-cover" /> : 
                <Plane className="absolute inset-0 m-auto h-8 w-8 text-muted-foreground/30" />
              }
            </div>
          )}
        </div>

        {/* Selector 2 */}
        <div>
          <select 
            className="w-full bg-background border border-white/20 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
            value={selected2?.id || ''}
            onChange={(e) => setSelected2(aircraftData.find(a => a.id === e.target.value) || null)}
          >
            {aircraftData.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
          {selected2 && (
            <div className="mt-4 relative h-32 w-full rounded-xl overflow-hidden bg-muted">
              {selected2.imageUrl ? 
                <Image src={selected2.imageUrl} alt={selected2.name} fill className="object-cover" /> : 
                <Plane className="absolute inset-0 m-auto h-8 w-8 text-muted-foreground/30" />
              }
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold mb-2 text-primary">Overview</h3>
        <SpecRow label="Manufacturer" value1={selected1?.family?.manufacturer} value2={selected2?.family?.manufacturer} />
        <SpecRow label="Class" value1={selected1?.family?.type} value2={selected2?.family?.type} />
        <SpecRow label="First Flight" value1={selected1?.firstFlightYear} value2={selected2?.firstFlightYear} higherIsBetter={false} />

        <h3 className="text-lg font-bold mb-2 mt-8 text-primary">Performance</h3>
        <SpecRow label="Cruise Speed (km/h)" value1={selected1?.performance?.cruiseSpeedKmh} value2={selected2?.performance?.cruiseSpeedKmh} />
        <SpecRow label="Cruise Speed (knots)" value1={selected1?.performance?.cruiseSpeedKmh ? Math.round(selected1.performance.cruiseSpeedKmh * 0.539957) : undefined} value2={selected2?.performance?.cruiseSpeedKmh ? Math.round(selected2.performance.cruiseSpeedKmh * 0.539957) : undefined} />
        <SpecRow label="Cruising Altitude (ft)" value1={selected1?.performance?.cruisingAltitudeFt?.toLocaleString()} value2={selected2?.performance?.cruisingAltitudeFt?.toLocaleString()} />
        <SpecRow label="Range (km)" value1={selected1?.performance?.rangeKm?.toLocaleString()} value2={selected2?.performance?.rangeKm?.toLocaleString()} />
        <SpecRow label="Range (NM)" value1={selected1?.performance?.rangeKm ? Math.round(selected1.performance.rangeKm * 0.539957).toLocaleString() : undefined} value2={selected2?.performance?.rangeKm ? Math.round(selected2.performance.rangeKm * 0.539957).toLocaleString() : undefined} />
        <SpecRow label="Capacity (Pax)" value1={selected1?.performance?.capacity} value2={selected2?.performance?.capacity} />

        <h3 className="text-lg font-bold mb-2 mt-8 text-primary">Dimensions</h3>
        <SpecRow label="Length (m)" value1={selected1?.dimensions?.lengthM} value2={selected2?.dimensions?.lengthM} />
        <SpecRow label="Wingspan (m)" value1={selected1?.dimensions?.wingspanM} value2={selected2?.dimensions?.wingspanM} />
        <SpecRow label="Height (m)" value1={selected1?.dimensions?.heightM} value2={selected2?.dimensions?.heightM} />

        <h3 className="text-lg font-bold mb-2 mt-8 text-primary">Typical Engines</h3>
        <SpecRow label="Name" value1={selected1?.engines?.[0]?.name} value2={selected2?.engines?.[0]?.name} />
        <SpecRow label="Thrust (kN)" value1={selected1?.engines?.[0]?.thrustKn} value2={selected2?.engines?.[0]?.thrustKn} />
        <SpecRow label="Bypass Ratio" value1={selected1?.engines?.[0]?.bypassRatio} value2={selected2?.engines?.[0]?.bypassRatio} />
      </div>
    </div>
  );
}
