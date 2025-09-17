import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import propertyApiService from '../services/propertyApiService';
import {
  CreatePropertyRequest,
  UpdatePropertyRequest,
  PropertyFilterRequest,
} from '../schemas/propertySchemas';

// Query keys
export const PROPERTY_QUERY_KEYS = {
  all: ['properties'] as const,
  lists: () => [...PROPERTY_QUERY_KEYS.all, 'list'] as const,
  list: (filters?: Partial<PropertyFilterRequest>) => [...PROPERTY_QUERY_KEYS.lists(), filters] as const,
  details: () => [...PROPERTY_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...PROPERTY_QUERY_KEYS.details(), id] as const,
};

/**
 * Hook to fetch paginated properties with optional filters
 */
export const useProperties = (filters?: Partial<PropertyFilterRequest>) => {
  return useQuery({
    queryKey: PROPERTY_QUERY_KEYS.list(filters),
    queryFn: async () => {
      const response = await propertyApiService.getProperties(filters);
      return response.data; // Return the data object which contains items, total, etc.
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};

// Alias for compatibility
export const usePropertyList = useProperties;

/**
 * Hook to fetch a single property by ID
 */
export const useProperty = (id: string) => {
  return useQuery({
    queryKey: PROPERTY_QUERY_KEYS.detail(id),
    queryFn: async () => {
      const response = await propertyApiService.getPropertyById(id);
      return response.data; // Return the data object
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });
};

/**
 * Hook to create a new property
 */
export const useCreateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePropertyRequest) => {
      const response = await propertyApiService.createProperty(data);
      if (!response.success) {
        throw new Error(response.message || 'Failed to create property');
      }
      return response;
    },
    onSuccess: () => {
      toast.success('Property created successfully!');
      // Invalidate properties list to refetch
      queryClient.invalidateQueries({ queryKey: PROPERTY_QUERY_KEYS.lists() });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create property');
    },
  });
};

/**
 * Hook to update an existing property
 */
export const useUpdateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdatePropertyRequest }) => {
      const response = await propertyApiService.updateProperty(id, data);
      if (!response.success) {
        throw new Error(response.message || 'Failed to update property');
      }
      return { response, id };
    },
    onSuccess: (_, { id }) => {
      toast.success('Property updated successfully!');
      // Invalidate specific property and lists
      queryClient.invalidateQueries({ queryKey: PROPERTY_QUERY_KEYS.detail(id) });
      queryClient.invalidateQueries({ queryKey: PROPERTY_QUERY_KEYS.lists() });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update property');
    },
  });
};

/**
 * Hook to delete a property
 */
export const useDeleteProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await propertyApiService.deleteProperty(id);
      if (!response.success) {
        throw new Error(response.message || 'Failed to delete property');
      }
      return { response, id };
    },
    onSuccess: (_, id) => {
      toast.success('Property deleted successfully!');
      // Remove from cache and invalidate lists
      queryClient.removeQueries({ queryKey: PROPERTY_QUERY_KEYS.detail(id) });
      queryClient.invalidateQueries({ queryKey: PROPERTY_QUERY_KEYS.lists() });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete property');
    },
  });
};

/**
 * Hook to test API connection
 */
export const useApiConnection = () => {
  return useQuery({
    queryKey: ['api-connection'],
    queryFn: () => propertyApiService.testConnection(),
    retry: 3,
    refetchInterval: 30000, // Check every 30 seconds
  });
};