import fs from 'fs';

const DB = [
  { family: 'A220 Family', mfr: 'Airbus', type: 'Narrow-body', variants: [
    { name: 'A220-100', wiki: 'Airbus_A220' },
    { name: 'A220-300', wiki: 'Airbus_A220' }
  ]},
  { family: 'A320 Family', mfr: 'Airbus', type: 'Narrow-body', variants: [
    { name: 'A320neo', wiki: 'Airbus_A320neo_family' },
    { name: 'A319neo', wiki: 'Airbus_A320neo_family' },
    { name: 'A321neo', wiki: 'Airbus_A321neo' },
    { name: 'A321XLR', wiki: 'Airbus_A321XLR' }
  ]},
  { family: 'A330 Family', mfr: 'Airbus', type: 'Wide-body', variants: [
    { name: 'A330-200', wiki: 'Airbus_A330' },
    { name: 'A330-300', wiki: 'Airbus_A330' },
    { name: 'A330-800', wiki: 'Airbus_A330neo' },
    { name: 'A330-900', wiki: 'Airbus_A330neo' },
    { name: 'A330-900neo', wiki: 'Airbus_A330neo' },
    { name: 'A330 MRTT', wiki: 'Airbus_A330_MRTT' }
  ]},
  { family: 'A340 Family', mfr: 'Airbus', type: 'Wide-body', variants: [
    { name: 'A340-200', wiki: 'Airbus_A340' },
    { name: 'A340-300', wiki: 'Airbus_A340' },
    { name: 'A340-500', wiki: 'Airbus_A340' },
    { name: 'A340-600', wiki: 'Airbus_A340' }
  ]},
  { family: 'A350 Family', mfr: 'Airbus', type: 'Wide-body', variants: [
    { name: 'A350-900', wiki: 'Airbus_A350' },
    { name: 'A350-1000', wiki: 'Airbus_A350' }
  ]},
  { family: 'A380 Family', mfr: 'Airbus', type: 'Wide-body', variants: [
    { name: 'A380-800', wiki: 'Airbus_A380' }
  ]},
  { family: '737 Family', mfr: 'Boeing', type: 'Narrow-body', variants: [
    { name: 'B737-700', wiki: 'Boeing_737_Next_Generation' },
    { name: 'B737-800', wiki: 'Boeing_737_Next_Generation' },
    { name: 'B737-900', wiki: 'Boeing_737_Next_Generation' },
    { name: 'B737-1000', wiki: 'Boeing_737_MAX_10' }
  ]},
  { family: '747 Family', mfr: 'Boeing', type: 'Wide-body', variants: [
    { name: 'B747-400', wiki: 'Boeing_747-400' }
  ]},
  { family: '757 Family', mfr: 'Boeing', type: 'Narrow-body', variants: [
    { name: 'B757-200', wiki: 'Boeing_757' },
    { name: 'B757-300', wiki: 'Boeing_757' }
  ]},
  { family: '767 Family', mfr: 'Boeing', type: 'Wide-body', variants: [
    { name: 'B767-300', wiki: 'Boeing_767' },
    { name: 'B767-400', wiki: 'Boeing_767' },
    { name: 'KC-46', wiki: 'Boeing_KC-46_Pegasus' }
  ]},
  { family: '777 Family', mfr: 'Boeing', type: 'Wide-body', variants: [
    { name: 'B777-200LR', wiki: 'Boeing_777' },
    { name: 'B777-200ER', wiki: 'Boeing_777' },
    { name: 'B777-300ER', wiki: 'Boeing_777' },
    { name: 'B777-8', wiki: 'Boeing_777X' },
    { name: 'B777-9', wiki: 'Boeing_777X' }
  ]},
  { family: '787 Family', mfr: 'Boeing', type: 'Wide-body', variants: [
    { name: 'B787-8', wiki: 'Boeing_787_Dreamliner' },
    { name: 'B787-9', wiki: 'Boeing_787_Dreamliner' },
    { name: 'B787-10', wiki: 'Boeing_787_Dreamliner' }
  ]},
  { family: 'E-Jet Family', mfr: 'Embraer', type: 'Regional', variants: [
    { name: 'E175', wiki: 'Embraer_E-Jet_family' },
    { name: 'E190', wiki: 'Embraer_E-Jet_family' },
    { name: 'E195', wiki: 'Embraer_E-Jet_family' },
    { name: 'E190-E2', wiki: 'Embraer_E-Jet_E2_family' }
  ]},
  { family: 'C295 Family', mfr: 'Airbus', type: 'Military', variants: [
    { name: 'C295', wiki: 'CASA_C-295' }
  ]},
  { family: 'A400M Atlas', mfr: 'Airbus', type: 'Military', variants: [
    { name: 'A400M', wiki: 'Airbus_A400M_Atlas' }
  ]},
  { family: 'C-390 Millennium', mfr: 'Embraer', type: 'Military', variants: [
    { name: 'C390', wiki: 'Embraer_C-390_Millennium' },
    { name: 'KC-390', wiki: 'Embraer_C-390_Millennium' }
  ]},
  { family: 'C-17 Globemaster', mfr: 'Boeing', type: 'Military', variants: [
    { name: 'C17', wiki: 'Boeing_C-17_Globemaster_III' },
    { name: 'KC-17', wiki: 'Boeing_C-17_Globemaster_III' }
  ]},
  { family: 'C-5 Galaxy', mfr: 'Lockheed Martin', type: 'Military', variants: [
    { name: 'C5', wiki: 'Lockheed_C-5_Galaxy' },
    { name: 'KC-5', wiki: 'Lockheed_C-5_Galaxy' }
  ]},
  { family: 'C-130 Hercules', mfr: 'Lockheed Martin', type: 'Military', variants: [
    { name: 'C130', wiki: 'Lockheed_C-130_Hercules' },
    { name: 'KC-130', wiki: 'Lockheed_Martin_KC-130' }
  ]}
];

function generatedSpecs(name) {
  const map = {
    'A220-100': { speed: 829, range: 6390, cap: 110, alt: 41000, len: 35.0, span: 35.1, height: 11.5, eng: { name: 'PW1500G', thrust: 106, bp: 12, fan: 1.85, mfr: 'Pratt & Whitney' } },
    'A220-300': { speed: 829, range: 6297, cap: 130, alt: 41000, len: 38.7, span: 35.1, height: 11.5, eng: { name: 'PW1500G', thrust: 106, bp: 12, fan: 1.85, mfr: 'Pratt & Whitney' } },
    'A319neo': { speed: 828, range: 6850, cap: 140, alt: 39000, len: 33.8, span: 35.8, height: 11.8, eng: { name: 'CFM LEAP-1A', thrust: 143, bp: 11, fan: 1.98, mfr: 'CFM International' } },
    'A320neo': { speed: 828, range: 6300, cap: 165, alt: 39000, len: 37.6, span: 35.8, height: 11.8, eng: { name: 'CFM LEAP-1A', thrust: 143, bp: 11, fan: 1.98, mfr: 'CFM International' } },
    'A321neo': { speed: 828, range: 7400, cap: 206, alt: 39000, len: 44.5, span: 35.8, height: 11.8, eng: { name: 'CFM LEAP-1A', thrust: 143, bp: 11, fan: 1.98, mfr: 'CFM International' } },
    'A321XLR': { speed: 828, range: 8700, cap: 206, alt: 39000, len: 44.5, span: 35.8, height: 11.8, eng: { name: 'CFM LEAP-1A', thrust: 143, bp: 11, fan: 1.98, mfr: 'CFM International' } },
    'A330-200': { speed: 871, range: 13450, cap: 246, alt: 41450, len: 58.8, span: 60.3, height: 17.4, eng: { name: 'Trent 700', thrust: 316, bp: 5, fan: 2.47, mfr: 'Rolls-Royce' } },
    'A330-300': { speed: 871, range: 11750, cap: 277, alt: 41450, len: 63.6, span: 60.3, height: 16.8, eng: { name: 'Trent 700', thrust: 316, bp: 5, fan: 2.47, mfr: 'Rolls-Royce' } },
    'A330-800': { speed: 871, range: 15094, cap: 257, alt: 41450, len: 58.8, span: 64.0, height: 17.4, eng: { name: 'Trent 7000', thrust: 324, bp: 10, fan: 2.84, mfr: 'Rolls-Royce' } },
    'A330-900': { speed: 871, range: 13334, cap: 287, alt: 41450, len: 63.6, span: 64.0, height: 16.8, eng: { name: 'Trent 7000', thrust: 324, bp: 10, fan: 2.84, mfr: 'Rolls-Royce' } },
    'A330-900neo': { speed: 871, range: 13334, cap: 287, alt: 41450, len: 63.6, span: 64.0, height: 16.8, eng: { name: 'Trent 7000', thrust: 324, bp: 10, fan: 2.84, mfr: 'Rolls-Royce' } },
    'A330 MRTT': { speed: 860, range: 14800, cap: 300, alt: 41000, len: 58.8, span: 60.3, height: 17.4, eng: { name: 'Trent 700', thrust: 316, bp: 5, fan: 2.47, mfr: 'Rolls-Royce' } },
    'A340-200': { speed: 871, range: 12400, cap: 240, alt: 41100, len: 59.4, span: 60.3, height: 16.8, eng: { name: 'CFM56-5C', thrust: 151, bp: 6.6, fan: 1.84, mfr: 'CFM International' } },
    'A340-300': { speed: 871, range: 13500, cap: 277, alt: 41100, len: 63.6, span: 60.3, height: 16.8, eng: { name: 'CFM56-5C', thrust: 151, bp: 6.6, fan: 1.84, mfr: 'CFM International' } },
    'A340-500': { speed: 885, range: 16670, cap: 293, alt: 41450, len: 67.9, span: 63.4, height: 17.2, eng: { name: 'Trent 500', thrust: 249, bp: 7.6, fan: 2.47, mfr: 'Rolls-Royce' } },
    'A340-600': { speed: 885, range: 14450, cap: 326, alt: 41450, len: 75.3, span: 63.4, height: 17.2, eng: { name: 'Trent 500', thrust: 249, bp: 7.6, fan: 2.47, mfr: 'Rolls-Royce' } },
    'A350-900': { speed: 903, range: 15000, cap: 315, alt: 43100, len: 66.8, span: 64.7, height: 17.0, eng: { name: 'Trent XWB-84', thrust: 374, bp: 9.3, fan: 3.00, mfr: 'Rolls-Royce' } },
    'A350-1000': { speed: 903, range: 16100, cap: 369, alt: 43100, len: 73.7, span: 64.7, height: 17.0, eng: { name: 'Trent XWB-97', thrust: 431, bp: 9.3, fan: 3.00, mfr: 'Rolls-Royce' } },
    'A380-800': { speed: 903, range: 14800, cap: 525, alt: 43000, len: 72.7, span: 79.7, height: 24.0, eng: { name: 'Trent 900', thrust: 374, bp: 8.5, fan: 2.95, mfr: 'Rolls-Royce' } },
    'B737-700': { speed: 838, range: 6230, cap: 126, alt: 41000, len: 33.6, span: 34.3, height: 12.5, eng: { name: 'CFM56-7B', thrust: 116, bp: 5.5, fan: 1.55, mfr: 'CFM International' } },
    'B737-800': { speed: 838, range: 5765, cap: 162, alt: 41000, len: 39.5, span: 34.3, height: 12.5, eng: { name: 'CFM56-7B', thrust: 116, bp: 5.5, fan: 1.55, mfr: 'CFM International' } },
    'B737-900': { speed: 838, range: 5800, cap: 178, alt: 41000, len: 42.1, span: 34.3, height: 12.5, eng: { name: 'CFM56-7B', thrust: 116, bp: 5.5, fan: 1.55, mfr: 'CFM International' } },
    'B737-1000': { speed: 838, range: 6110, cap: 188, alt: 41000, len: 43.8, span: 35.9, height: 12.3, eng: { name: 'LEAP-1B', thrust: 130, bp: 9, fan: 1.76, mfr: 'CFM International' } },
    'B747-400': { speed: 912, range: 13450, cap: 416, alt: 45100, len: 70.6, span: 64.4, height: 19.4, eng: { name: 'PW4000-94', thrust: 284, bp: 4.8, fan: 2.39, mfr: 'Pratt & Whitney' } },
    'B757-200': { speed: 850, range: 7220, cap: 200, alt: 42000, len: 47.3, span: 38.0, height: 13.5, eng: { name: 'RB211-535', thrust: 191, bp: 4.3, fan: 1.88, mfr: 'Rolls-Royce' } },
    'B757-300': { speed: 850, range: 6287, cap: 243, alt: 42000, len: 54.4, span: 38.0, height: 13.5, eng: { name: 'RB211-535', thrust: 191, bp: 4.3, fan: 1.88, mfr: 'Rolls-Royce' } },
    'B767-300': { speed: 850, range: 11070, cap: 218, alt: 43100, len: 54.9, span: 47.6, height: 15.8, eng: { name: 'CF6-80C2', thrust: 276, bp: 5, fan: 2.36, mfr: 'GE Aerospace' } },
    'B767-400': { speed: 850, range: 10415, cap: 245, alt: 43100, len: 61.3, span: 51.9, height: 16.8, eng: { name: 'CF6-80C2', thrust: 276, bp: 5, fan: 2.36, mfr: 'GE Aerospace' } },
    'KC-46': { speed: 850, range: 12200, cap: 114, alt: 43100, len: 50.5, span: 47.5, height: 15.9, eng: { name: 'PW4062', thrust: 282, bp: 4.8, fan: 2.39, mfr: 'Pratt & Whitney' } },
    'B777-200ER': { speed: 892, range: 13080, cap: 313, alt: 43100, len: 63.7, span: 60.9, height: 18.5, eng: { name: 'GE90-94B', thrust: 417, bp: 8.4, fan: 3.12, mfr: 'GE Aerospace' } },
    'B777-200LR': { speed: 892, range: 15843, cap: 317, alt: 43100, len: 63.7, span: 64.8, height: 18.6, eng: { name: 'GE90-110B1', thrust: 489, bp: 9, fan: 3.25, mfr: 'GE Aerospace' } },
    'B777-300ER': { speed: 892, range: 13649, cap: 396, alt: 43100, len: 73.9, span: 64.8, height: 18.5, eng: { name: 'GE90-115B', thrust: 512, bp: 9, fan: 3.25, mfr: 'GE Aerospace' } },
    'B777-8': { speed: 892, range: 16170, cap: 395, alt: 43100, len: 69.8, span: 71.8, height: 19.5, eng: { name: 'GE9X', thrust: 489, bp: 10, fan: 3.40, mfr: 'GE Aerospace' } },
    'B777-9': { speed: 892, range: 13500, cap: 426, alt: 43100, len: 76.7, span: 71.8, height: 19.5, eng: { name: 'GE9X', thrust: 489, bp: 10, fan: 3.40, mfr: 'GE Aerospace' } },
    'B787-8': { speed: 903, range: 13620, cap: 242, alt: 43100, len: 56.7, span: 60.1, height: 16.9, eng: { name: 'GEnx-1B', thrust: 330, bp: 9, fan: 2.82, mfr: 'GE Aerospace' } },
    'B787-9': { speed: 903, range: 14140, cap: 290, alt: 43100, len: 62.8, span: 60.1, height: 17.0, eng: { name: 'GEnx-1B', thrust: 330, bp: 9, fan: 2.82, mfr: 'GE Aerospace' } },
    'B787-10': { speed: 903, range: 11910, cap: 330, alt: 43100, len: 68.3, span: 60.1, height: 17.0, eng: { name: 'GEnx-1B', thrust: 330, bp: 9, fan: 2.82, mfr: 'GE Aerospace' } },
    'E175': { speed: 829, range: 4074, cap: 78, alt: 41000, len: 31.6, span: 28.6, height: 9.9, eng: { name: 'CF34-8E', thrust: 63, bp: 5, fan: 1.17, mfr: 'GE Aerospace' } },
    'E190': { speed: 829, range: 4537, cap: 100, alt: 41000, len: 36.2, span: 28.7, height: 10.5, eng: { name: 'CF34-10E', thrust: 89, bp: 5.4, fan: 1.35, mfr: 'GE Aerospace' } },
    'E195': { speed: 829, range: 4260, cap: 116, alt: 41000, len: 38.6, span: 28.7, height: 10.5, eng: { name: 'CF34-10E', thrust: 89, bp: 5.4, fan: 1.35, mfr: 'GE Aerospace' } },
    'E190-E2': { speed: 829, range: 5186, cap: 106, alt: 41000, len: 36.2, span: 33.7, height: 10.9, eng: { name: 'PW1900G', thrust: 102, bp: 12, fan: 1.85, mfr: 'Pratt & Whitney' } },
    'C295': { speed: 480, range: 4600, cap: 71, alt: 25000, len: 24.5, span: 25.8, height: 8.6, eng: { name: 'PW127G', thrust: 20, bp: null, fan: null, mfr: 'Pratt & Whitney Canada' } },
    'A400M': { speed: 781, range: 8700, cap: 116, alt: 40000, len: 45.1, span: 42.4, height: 14.7, eng: { name: 'TP400-D6', thrust: 82, bp: null, fan: null, mfr: 'Europrop' } },
    'C390': { speed: 870, range: 5820, cap: 80, alt: 36000, len: 35.2, span: 35.0, height: 11.8, eng: { name: 'V2500-E5', thrust: 139, bp: 4.8, fan: 1.61, mfr: 'IAE' } },
    'KC-390': { speed: 870, range: 5820, cap: 80, alt: 36000, len: 35.2, span: 35.0, height: 11.8, eng: { name: 'V2500-E5', thrust: 139, bp: 4.8, fan: 1.61, mfr: 'IAE' } },
    'C17': { speed: 830, range: 4480, cap: 102, alt: 45000, len: 53.0, span: 51.7, height: 16.8, eng: { name: 'F117-PW-100', thrust: 180, bp: 6.0, fan: 2.00, mfr: 'Pratt & Whitney' } },
    'KC-17': { speed: 830, range: 4480, cap: 102, alt: 45000, len: 53.0, span: 51.7, height: 16.8, eng: { name: 'F117-PW-100', thrust: 180, bp: 6.0, fan: 2.00, mfr: 'Pratt & Whitney' } },
    'C5': { speed: 833, range: 8900, cap: 73, alt: 41000, len: 75.3, span: 67.8, height: 19.8, eng: { name: 'TF39-GE-1C', thrust: 191, bp: 8.0, fan: 2.44, mfr: 'GE Aerospace' } },
    'KC-5': { speed: 833, range: 8900, cap: 73, alt: 41000, len: 75.3, span: 67.8, height: 19.8, eng: { name: 'TF39-GE-1C', thrust: 191, bp: 8.0, fan: 2.44, mfr: 'GE Aerospace' } },
    'C130': { speed: 592, range: 3800, cap: 92, alt: 33000, len: 29.8, span: 40.4, height: 11.8, eng: { name: 'AE 2100D3', thrust: 34, bp: null, fan: null, mfr: 'Rolls-Royce' } },
    'KC-130': { speed: 592, range: 3800, cap: 92, alt: 33000, len: 29.8, span: 40.4, height: 11.8, eng: { name: 'AE 2100D3', thrust: 34, bp: null, fan: null, mfr: 'Rolls-Royce' } }
  };
  return map[name] || { speed: 850, range: 5000, cap: 150, alt: 41000, len: 35, span: 35, height: 12, eng: { name: 'Generic', thrust: 100, bp: 5, fan: null, mfr: 'Generic' } };
}

async function fetchImage(title) {
  try {
    const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=${title}&pithumbsize=1000&format=json`);
    const data = await res.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId !== '-1' && pages[pageId].thumbnail) {
      return pages[pageId].thumbnail.source;
    }
  } catch(e) {}
  return "https://upload.wikimedia.org/wikipedia/commons/9/91/Boeing_777-300ER_Emirates.jpg"; 
}

async function run() {
  let seedFile = `import { PrismaClient } from '@prisma/client';\nconst prisma = new PrismaClient();\nasync function main() {\n  await prisma.engine.deleteMany({});\n  await prisma.performance.deleteMany({});\n  await prisma.dimensions.deleteMany({});\n  await prisma.variant.deleteMany({});\n  await prisma.aircraftFamily.deleteMany({});\n\n`;

  for (let f of DB) {
    const famVar = `fam_${f.family.replace(/[^a-zA-Z0-9]/g, '')}`;
    seedFile += `  const ${famVar} = await prisma.aircraftFamily.create({ data: { name: '${f.family}', manufacturer: '${f.mfr}', type: '${f.type}', description: '${f.type} aircraft family by ${f.mfr}.' } });\n`;
    
    for (let v of f.variants) {
      let img = await fetchImage(v.wiki);
      const specs = generatedSpecs(v.name);
      
      const perfStr = `cruiseSpeedKmh: ${specs.speed}, cruiseSpeedKnots: ${Math.round(specs.speed / 1.852)}, rangeKm: ${specs.range}, capacity: ${specs.cap}, cruisingAltitudeFt: ${specs.alt}`;
      const dimStr = `lengthM: ${specs.len}, wingspanM: ${specs.span}, heightM: ${specs.height}`;
      
      const fanStr = specs.eng.fan ? `, fanDiameterM: ${specs.eng.fan}` : '';
      const bpStr = specs.eng.bp ? `, bypassRatio: ${specs.eng.bp}` : '';
      
      const engStr = `{ connectOrCreate: [{ where: { name: '${specs.eng.name}' }, create: { name: '${specs.eng.name}', thrustKn: ${specs.eng.thrust}${bpStr}${fanStr}, manufacturer: '${specs.eng.mfr}' } }] }`;

      seedFile += `  await prisma.variant.create({ data: { name: '${v.name}', familyId: ${famVar}.id, imageUrl: '${img}', performance: { create: { ${perfStr} } }, dimensions: { create: { ${dimStr} } }, engines: ${engStr} } });\n`;
    }
  }

  seedFile += `\n  console.log('Seeding completed!');\n}\nmain().catch(console.error).finally(()=>prisma.$disconnect());\n`;

  fs.writeFileSync('prisma/seed.ts', seedFile);
  console.log('Wrote prisma/seed.ts');
}
run();
