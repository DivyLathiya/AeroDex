import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  const manufacturer = searchParams.get('manufacturer');
  const type = searchParams.get('type');

  let whereClause: any = {};

  if (q) {
    whereClause.name = { contains: q };
  }
  
  if (manufacturer || type) {
    whereClause.family = {};
    if (manufacturer) whereClause.family.manufacturer = manufacturer;
    if (type) whereClause.family.type = type;
  }

  try {
    const variants = await prisma.variant.findMany({
      where: whereClause,
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
