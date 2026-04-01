import prisma from '@/lib/prisma';
import CompareTool from '@/components/CompareTool';

export default async function ComparePage() {
  const aircraftData = await prisma.variant.findMany({
    include: {
      family: true,
      performance: true,
      dimensions: true,
      engines: true,
    },
    orderBy: { name: 'asc' }
  });

  return (
    <div className="container mx-auto px-4 py-12 min-h-[80vh]">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Compare Aircraft</h1>
        <p className="text-muted-foreground text-lg">
          Select from our database of {aircraftData.length} aircraft variants to see a detailed, side-by-side comparison of their performance, dimensions, and payload capabilities.
        </p>
      </div>
      
      <CompareTool aircraftData={JSON.parse(JSON.stringify(aircraftData))} />
    </div>
  );
}
