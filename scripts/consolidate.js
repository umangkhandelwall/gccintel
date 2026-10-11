const fs = require('fs');
const path = 'C:/Users/khand/OneDrive/Desktop/gccintel/data/gccs.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// 1. Remove Genpact and Deloitte
let cleaned = data.filter(g => g.id !== 'gcc_genpact_ncr_001' && g.id !== 'gcc_deloitte_hyd_001');

// 2. Normalise taxonomy
const sectorMap = {
  'Technology': 'Software & Enterprise Tech',
  'Technology/Travel': 'Software & Enterprise Tech',
  'BFSI': 'BFSI & FinTech',
  'BFSI/FinTech': 'BFSI & FinTech',
  'Manufacturing/ER&D': 'Automotive & Mobility ER&D',
  'Automotive/ER&D': 'Automotive & Mobility ER&D',
  'Semiconductors/ER&D': 'Semiconductors & Electronics',
  'Aerospace/ER&D': 'Aerospace & Heavy Engineering',
  'Healthcare/Life Sciences': 'Healthcare & Life Sciences',
  'Retail': 'Retail & Consumer Tech',
  'Consumer Goods/Retail': 'Retail & Consumer Tech',
  'Telecom/Technology': 'Software & Enterprise Tech'
};

cleaned = cleaned.map(g => {
  if (g.name.includes('Bosch') || g.name.includes('Siemens') || g.name.includes('Honeywell')) {
    g.parentSector = 'Automotive & Mobility ER&D';
  } else if (sectorMap[g.parentSector]) {
    g.parentSector = sectorMap[g.parentSector];
  }
  return g;
});

// 3. Consolidate into Entity-level records
const entityMap = new Map();

cleaned.forEach(item => {
  if (!entityMap.has(item.parentCompany)) {
    entityMap.set(item.parentCompany, {
      id: 'entity_' + item.parentCompany.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      name: item.parentCompany + ' India Captive Entity',
      parentCompany: item.parentCompany,
      parentCountry: item.parentCountry,
      parentSector: item.parentSector,
      primaryHub: item.city,
      campuses: [{
        city: item.city,
        state: item.state,
        microMarket: item.microMarket || 'Main Campus',
        centerName: item.name
      }],
      headcountBand: item.headcountBand,
      yearEstablished: item.yearEstablished,
      functions: [...item.functions],
      operatingModel: item.operatingModel,
      sources: [...item.sources],
      confidence: item.confidence,
      verified: true,
      lastUpdated: '2026-05-15'
    });
  } else {
    const existing = entityMap.get(item.parentCompany);
    const hasCampus = existing.campuses.some(c => c.city === item.city);
    if (!hasCampus) {
      existing.campuses.push({
        city: item.city,
        state: item.state,
        microMarket: item.microMarket || 'Main Campus',
        centerName: item.name
      });
    }
    item.functions.forEach(f => {
      if (!existing.functions.includes(f)) existing.functions.push(f);
    });
    item.sources.forEach(s => {
      if (!existing.sources.some(es => es.url === s.url)) existing.sources.push(s);
    });
    if (item.yearEstablished < existing.yearEstablished) existing.yearEstablished = item.yearEstablished;
  }
});

const consolidatedEntities = Array.from(entityMap.values()).map(e => {
  const extraCount = e.campuses.length - 1;
  return {
    ...e,
    city: e.primaryHub + (extraCount > 0 ? ' (+' + extraCount + ' multi-city sites)' : ''),
    state: e.campuses[0].state,
    totalUnitsInIndia: e.campuses.length
  };
});

fs.writeFileSync(path, JSON.stringify(consolidatedEntities, null, 2));
console.log('Successfully consolidated to ' + consolidatedEntities.length + ' unique corporate entities.');
