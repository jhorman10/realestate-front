import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { RootState } from '../store';
import { 
  setAllProperties, 
  setLoading, 
  setError, 
  updateLocalFilters, 
  clearLocalFilters,
  markForRefetch 
} from '../store/slices/propertySlice';
import { usePropertyList } from './usePropertyApi';
import type { PropertyFilterRequest } from '../schemas/propertySchemas';

/**
 * Hook for managing properties with local filtering to prevent focus loss
 * This hook combines Redux state management with local filtering to provide
 * instant filtering without making API calls on every keystroke
 */
export const usePropertiesWithLocalFilter = () => {
  const dispatch = useDispatch();
  
  // Get state from Redux
  const {
    allProperties,
    properties,
    localFilters,
    apiFilters,
    loading,
    error,
    totalCount,
    shouldRefetch,
    lastFetchTime
  } = useSelector((state: RootState) => state.properties);

  // Only fetch from API when necessary
  const shouldFetchFromApi = shouldRefetch || 
    (allProperties.length === 0) || 
    (Date.now() - lastFetchTime > 5 * 60 * 1000); // 5 minutes cache

  // Fetch data from API only when needed
  const { 
    data: apiResponse, 
    isLoading: apiLoading, 
    error: apiError 
  } = usePropertyList(shouldFetchFromApi ? apiFilters : undefined);

  // Update Redux state when API data changes
  useEffect(() => {
    if (apiResponse?.items && shouldFetchFromApi) {
      dispatch(setAllProperties(apiResponse.items));
    }
  }, [apiResponse, dispatch, shouldFetchFromApi]);

  // Update loading and error states
  useEffect(() => {
    dispatch(setLoading(apiLoading));
  }, [apiLoading, dispatch]);

  useEffect(() => {
    if (apiError) {
      dispatch(setError(apiError.message || 'Failed to load properties'));
    } else {
      dispatch(setError(null));
    }
  }, [apiError, dispatch]);

  // Local filter functions that don't trigger API calls
  const updateFilters = useCallback((filters: Partial<PropertyFilterRequest>) => {
    dispatch(updateLocalFilters(filters));
  }, [dispatch]);

  const clearFilters = useCallback(() => {
    dispatch(clearLocalFilters());
  }, [dispatch]);

  const refreshData = useCallback(() => {
    dispatch(markForRefetch());
  }, [dispatch]);

  return {
    // Data
    properties,
    allProperties,
    totalCount,
    
    // Filter state
    filters: localFilters,
    
    // Loading states
    loading,
    error,
    
    // Actions that don't cause API calls (maintain focus)
    updateFilters,
    clearFilters,
    
    // Actions that do cause API calls
    refreshData,
    
    // Utility
    hasData: allProperties.length > 0,
    isFiltered: Object.keys(localFilters).length > 0,
  };
};