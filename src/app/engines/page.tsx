import prisma from '@/lib/prisma';
import EnginesClient from './EnginesClient';

export default async function EnginesPage() {
  const engines = await prisma.engine.findMany({
    include: {
      variants: {
        include: { family: true }
      }
    },
    orderBy: [{ manufacturer: 'asc' }, { thrustKn: 'desc' }]
  });

  return <EnginesClient initialEngines={engines} />;
}
