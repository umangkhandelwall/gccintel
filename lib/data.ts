import gccsData from '@/data/gccs.json';
import citiesData from '@/data/cities.json';
import policiesData from '@/data/policies.json';
import reconciliationData from '@/data/reconciliation.json';
import pipelineData from '@/data/pipeline.json';
import providersData from '@/data/providers.json';
import { GCC, CityData, StatePolicy, ReconciliationItem, PipelineSignal, ServiceProvider } from './types';

export function getAllGCCs(): GCC[] {
  return gccsData as GCC[];
}

export function getGCCById(id: string): GCC | undefined {
  return (gccsData as GCC[]).find((item) => item.id === id);
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
  (gccsData as GCC[]).forEach((item) => {
    map[item.parentSector] = (map[item.parentSector] || 0) + 1;
  });
  return map;
}

export function getCityAggregates(): Record<string, number> {
  const map: Record<string, number> = {};
  (gccsData as GCC[]).forEach((item) => {
    map[item.city] = (map[item.city] || 0) + 1;
  });
  return map;
}

export function getParentCountryAggregates(): Record<string, number> {
  const map: Record<string, number> = {};
  (gccsData as GCC[]).forEach((item) => {
    map[item.parentCountry] = (map[item.parentCountry] || 0) + 1;
  });
  return map;
}
