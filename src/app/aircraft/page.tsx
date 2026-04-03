import prisma from '@/lib/prisma';
import AircraftClient from './AircraftClient';

export default async function AircraftDirectory() {
  const families = await prisma.aircraftFamily.findMany({
    include: {
      variants: true,
    },
    orderBy: {
      name: 'asc'
    }
  });

  return <AircraftClient initialFamilies={families} />;
}