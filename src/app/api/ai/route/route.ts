import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { departure, arrival, aircraftSpeedKmh } = await request.json();

    // Mock response simulating a route calculation and flight time
    // In a real application, you'd calculate Haversine distance and fetch real weather/wind data.
    
    // Mock random distance between 1000 and 8000 km
    const distanceKm = Math.floor(Math.random() * 7000) + 1000;
    
    // Calculate basic flight time
    const speed = aircraftSpeedKmh || 850; // default to 850 km/h
    let flightTimeHours = distanceKm / speed;
    
    // Add 30 mins for takeoff/landing procedures
    flightTimeHours += 0.5;
    
    const hours = Math.floor(flightTimeHours);
    const minutes = Math.floor((flightTimeHours - hours) * 60);
    
    // Mock wind effect
    const isHeadwind = Math.random() > 0.5;
    const windEffect = isHeadwind ? '+15 mins (Headwind)' : '-10 mins (Tailwind)';

    return NextResponse.json({ 
      distanceKm,
      estimatedFlightTime: `${hours}h ${minutes}m`,
      windEffect,
      route: `${departure.toUpperCase()} ✈️ ${arrival.toUpperCase()}`
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to calculate route' }, { status: 500 });
  }
}
