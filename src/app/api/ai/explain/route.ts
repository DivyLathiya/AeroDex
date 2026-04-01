import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { aircraftId, aircraftName } = await request.json();

    // In a real app, this would call OpenAI/Anthropic API to generate a response
    // based on the aircraft details fetched from the DB.
    
    // Mock response
    const explanation = `
### Understanding the ${aircraftName || 'Aircraft'}

**Why Bypass Ratio Matters:**
Bypass ratio is the ratio between the mass flow rate of air drawn in by the fan that bypasses the engine core to the mass flow rate passing through the engine core. A higher bypass ratio generally means better fuel efficiency and lower noise levels, which is crucial for modern commercial aviation.

**Engine Efficiency:**
The engines on the ${aircraftName || 'aircraft'} are designed with advanced materials and high bypass ratios to reduce fuel burn and CO2 emissions significantly compared to previous generations. 

**Real-world Performance:**
This aircraft provides airlines with exceptional operating economics. With its optimized aerodynamic design and efficient engines, it can perform long haul routes efficiently or maximize dense short-haul networks depending on its family type.
    `;

    return NextResponse.json({ explanation });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate explanation' }, { status: 500 });
  }
}
