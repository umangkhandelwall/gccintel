export interface Source {
  url: string;
  publisher: string;
  date: string;
  note: string;
}

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface GCC {
  id: string;
  name: string;
  parentCompany: string;
  parentCountry: string;
  parentSector: string;
  city: string;
  state: string;
  microMarket?: string;
  headcountBand: '<500' | '500-2000' | '2000-10000' | '>10000';
  yearEstablished: number;
  functions: string[];
  operatingModel: 'wholly-owned' | 'BOT' | 'EOR' | 'hybrid';
  sources: Source[];
  confidence: ConfidenceLevel;
  verified: boolean;
  verifiedDate?: string;
  lastUpdated: string;
}

export interface CityData {
  id: string;
  name: string;
  state: string;
  gccCount: number;
  totalHeadcount?: number;
  gradeARentRange: { min: number; max: number; unit: string };
  avgRent: number;
  talentCostIndex: number;
  topSectors: string[];
  microMarkets: string[];
  gccClusters: string[];
  keyStrengths: string[];
  primaryChallenge: string;
  sources: Source[];
  confidence: ConfidenceLevel;
}

export interface PolicyIncentive {
  type: string;
  description: string;
  quantifiedValue?: string;
}

export interface StatePolicy {
  id: string;
  state: string;
  policyName: string;
  policyYear: number;
  nodalAgency: string;
  target: string;
  incentives: PolicyIncentive[];
  eligibilityCriteria: string[];
  applicationProcess: string;
  officialUrl: string;
  sources: Source[];
  confidence: ConfidenceLevel;
}

export interface ReconciliationItem {
  source: string;
  year: number;
  reportedCount: number;
  countType: string;
  definition: string;
  whyItDiffers: string;
  revenue: string;
  headcount: string;
  confidence: ConfidenceLevel;
  url: string;
}

export interface PipelineSignal {
  id: string;
  companyName: string;
  headquarters: string;
  sector: string;
  targetCity: string;
  targetState: string;
  targetCluster: string;
  investmentAnnounced: string;
  projectedHeadcount: string;
  signalStage: string;
  firstSignalDate: string;
  leadIndicator: string;
  keyWorkloads: string[];
  filingEvidence: string;
  officialSources: Source[];
  verificationStatus: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  category: string;
  headquarters: string;
  yearFounded: number;
  operatingModel: string;
  verifiedGccsEstablished: string;
  confirmedPublicClients: string[];
  verifiedCapabilities: string[];
  pricingModel: string;
  officialSources: Source[];
  confidence: ConfidenceLevel;
}
