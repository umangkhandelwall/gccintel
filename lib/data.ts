import gccsData from '@/data/gccs.json';
import citiesData from '@/data/cities.json';
import policiesData from '@/data/policies.json';
import reconciliationData from '@/data/reconciliation.json';
import pipelineData from '@/data/pipeline.json';
import providersData from '@/data/providers.json';
import { GCCEntity, CityData, StatePolicy, ReconciliationItem, PipelineSignal, ServiceProvider } from './types';

export function getAllGCCs(): GCCEntity[] {
  return gccsData as GCCEntity[];
}

export function getGCCById(id: string): GCCEntity | undefined {
  return (gccsData as GCCEntity[]).find((item) => item.id === id);
}

export function getAllCities(): CityData[] {
  return citiesData as CityData[];
}

export function getCityById(id: string): CityData | undefined {
  return (citiesData as CityData[]).find((item) => item.id.toLowerCase() === id.toLowerCase());
}

export function getAllPolicies(): StatePolicy[] {
  return policiesData as StatePolicy[];
}

export function getPolicyByState(state: string): StatePolicy | undefined {
  return (policiesData as StatePolicy[]).find(
    (item) => item.state.toLowerCase() === state.toLowerCase()
  );
}

export function getReconciliationData(): ReconciliationItem[] {
  return reconciliationData as ReconciliationItem[];
}

export function getAllPipelineSignals(): PipelineSignal[] {
  return pipelineData as PipelineSignal[];
}

export function getAllProviders(): ServiceProvider[] {
  return providersData as ServiceProvider[];
}

// Pure Aggregates for Data Views and Tests
export function getSectorAggregates(): Record<string, number> {
  const map: Record<string, number> = {};
  (gccsData as GCCEntity[]).forEach((item) => {
    map[item.parentSector] = (map[item.parentSector] || 0) + 1;
  });
  return map;
}

export function getCityAggregates(): Record<string, number> {
  const map: Record<string, number> = {};
  (gccsData as GCCEntity[]).forEach((item) => {
    map[item.primaryHub] = (map[item.primaryHub] || 0) + 1;
  });
  return map;
}

export function getParentCountryAggregates(): Record<string, number> {
  const map: Record<string, number> = {};
  (gccsData as GCCEntity[]).forEach((item) => {
    map[item.parentCountry] = (map[item.parentCountry] || 0) + 1;
  });
  return map;
}
