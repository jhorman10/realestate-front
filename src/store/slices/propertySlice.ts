import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Property, PropertyFilterRequest } from '../../schemas/propertySchemas';

interface PropertyState {
  // Data from backend
  allProperties: Property[]; // All properties loaded from backend
  properties: Property[]; // Filtered properties for display
  
  // Filter states
  apiFilters: PropertyFilterRequest; // Filters applied to API calls
  localFilters: PropertyFilterRequest; // Filters applied locally for instant filtering
  
  // UI states
  loading: boolean;
  error: string | null;
  
  // Pagination
  totalCount: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  
  // Selection
  selectedProperty: Property | null;
  
  // Cache control
  lastFetchTime: number;
  shouldRefetch: boolean;
}

const initialState: PropertyState = {
  allProperties: [],
  properties: [],
  apiFilters: {},
  localFilters: {},
  loading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  totalPages: 0,
  pageSize: 10,
  selectedProperty: null,
  lastFetchTime: 0,
  shouldRefetch: true,
};

// Helper function to filter properties locally
const filterPropertiesLocally = (properties: Property[], filters: PropertyFilterRequest): Property[] => {
  if (!filters || Object.keys(filters).length === 0) {
    return properties;
  }

  return properties.filter(property => {
    // Name filter
    if (filters.name && !property.name.toLowerCase().includes(filters.name.toLowerCase())) {
      return false;
    }

    // Address filter
    if (filters.address && !property.address.toLowerCase().includes(filters.address.toLowerCase())) {
      return false;
    }

    // Price range filters
    if (filters.minPrice && property.price < filters.minPrice) {
      return false;
    }

    if (filters.maxPrice && property.price > filters.maxPrice) {
      return false;
    }

    // Price range filters (compatibility aliases)
    if (filters.priceMin && property.price < filters.priceMin) {
      return false;
    }

    if (filters.priceMax && property.price > filters.priceMax) {
      return false;
    }

    // Year filter
    if (filters.year && property.year !== filters.year) {
      return false;
    }

    // Enabled filter
    if (filters.enabled !== undefined && property.enabled !== filters.enabled) {
      return false;
    }

    // Owner filter
    if (filters.ownerId && property.ownerId !== filters.ownerId) {
      return false;
    }

    return true;
  });
};

const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    // Loading and error states
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    // Properties data management
    setAllProperties: (state, action: PayloadAction<Property[]>) => {
      state.allProperties = action.payload;
      state.properties = filterPropertiesLocally(action.payload, state.localFilters);
      state.totalCount = state.properties.length;
      state.lastFetchTime = Date.now();
      state.shouldRefetch = false;
    },
    setProperties: (state, action: PayloadAction<Property[]>) => {
      state.properties = action.payload;
      state.totalCount = action.payload.length;
    },
    
    // Pagination
    setPagination: (state, action: PayloadAction<{
      totalCount: number;
      currentPage: number;
      totalPages: number;
      pageSize: number;
    }>) => {
      state.totalCount = action.payload.totalCount;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.pageSize = action.payload.pageSize;
    },
    
    // Filter management
    setApiFilters: (state, action: PayloadAction<PropertyFilterRequest>) => {
      state.apiFilters = action.payload;
      state.shouldRefetch = true;
    },
    setLocalFilters: (state, action: PayloadAction<PropertyFilterRequest>) => {
      state.localFilters = action.payload;
      state.properties = filterPropertiesLocally(state.allProperties, action.payload);
      state.totalCount = state.properties.length;
    },
    updateLocalFilters: (state, action: PayloadAction<Partial<PropertyFilterRequest>>) => {
      state.localFilters = { ...state.localFilters, ...action.payload };
      state.properties = filterPropertiesLocally(state.allProperties, state.localFilters);
      state.totalCount = state.properties.length;
    },
    clearLocalFilters: (state) => {
      state.localFilters = {};
      state.properties = state.allProperties;
      state.totalCount = state.allProperties.length;
    },
    clearAllFilters: (state) => {
      state.localFilters = {};
      state.apiFilters = {};
      state.properties = state.allProperties;
      state.totalCount = state.allProperties.length;
      state.shouldRefetch = true;
    },
    
    // Property CRUD operations
    setSelectedProperty: (state, action: PayloadAction<Property | null>) => {
      state.selectedProperty = action.payload;
    },
    addProperty: (state, action: PayloadAction<Property>) => {
      state.allProperties.unshift(action.payload);
      state.properties = filterPropertiesLocally(state.allProperties, state.localFilters);
      state.totalCount = state.properties.length;
    },
    updateProperty: (state, action: PayloadAction<Property>) => {
      const index = state.allProperties.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.allProperties[index] = action.payload;
        state.properties = filterPropertiesLocally(state.allProperties, state.localFilters);
      }
      if (state.selectedProperty?.id === action.payload.id) {
        state.selectedProperty = action.payload;
      }
    },
    deleteProperty: (state, action: PayloadAction<string>) => {
      state.allProperties = state.allProperties.filter(p => p.id !== action.payload);
      state.properties = filterPropertiesLocally(state.allProperties, state.localFilters);
      state.totalCount = state.properties.length;
      if (state.selectedProperty?.id === action.payload) {
        state.selectedProperty = null;
      }
    },
    
    // Cache management
    markForRefetch: (state) => {
      state.shouldRefetch = true;
    },
    resetCache: (state) => {
      state.allProperties = [];
      state.properties = [];
      state.totalCount = 0;
      state.lastFetchTime = 0;
      state.shouldRefetch = true;
    },
  },
});

export const {
  setLoading,
  setError,
  setAllProperties,
  setProperties,
  setPagination,
  setApiFilters,
  setLocalFilters,
  updateLocalFilters,
  clearLocalFilters,
  clearAllFilters,
  setSelectedProperty,
  addProperty,
  updateProperty,
  deleteProperty,
  markForRefetch,
  resetCache,
} = propertySlice.actions;

export default propertySlice.reducer;
