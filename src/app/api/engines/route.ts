import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-static';

export async function GET() {
  try {
    const engines = await prisma.engine.findMany({
      orderBy: { manufacturer: 'asc' }
    });
    return NextResponse.json(engines);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch engines' }, { status: 500 });
  }
}
