import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-static';

export async function GET() {
  try {
    const variants = await prisma.variant.findMany({
      include: {
        family: true,
        performance: true,
      },
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json(variants);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch aircraft' }, { status: 500 });
  }
}
