import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  try {
    const variant = await prisma.variant.findUnique({
      where: { id: resolvedParams.id },
      include: {
        family: true,
        performance: true,
        dimensions: true,
        engines: true,
      }
    });

    if (!variant) {
      return NextResponse.json({ error: 'Aircraft not found' }, { status: 404 });
    }

    return NextResponse.json(variant);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch aircraft details' }, { status: 500 });
  }
}
