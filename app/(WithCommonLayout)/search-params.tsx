import {  createLoader, parseAsString } from 'nuqs/server'
 
// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const coordinatesSearchParams = {
  searchTerm: parseAsString.withDefault(""),
  isPaid: parseAsString.withDefault(""),
  sortBy: parseAsString.withDefault(""),
  sortOrder: parseAsString.withDefault(""),
  category: parseAsString.withDefault(""),
}
 
export const loadSearchParams = createLoader(coordinatesSearchParams)