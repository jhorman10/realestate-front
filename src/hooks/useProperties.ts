import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { propertyService } from '../services/propertyService';
import type { Property, PropertyQueryParams } from '../types/property';
import { useAppDispatch } from '../store';
import { addNotification as addUINotification } from '../store/slices/uiSlice';

const QUERY_KEYS = {
  properties: 'properties',
  property: 'property',
  propertyTypes: 'propertyTypes',
  propertyStatuses: 'propertyStatuses',
} as const;

export const useProperties = (params?: PropertyQueryParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.properties, params],
    queryFn: () => propertyService.getProperties(params),
    select: (data) => data.data,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useProperty = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.property, id],
    queryFn: () => propertyService.getPropertyById(id),
    select: (data) => data.data,
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateProperty = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) =>
      propertyService.createProperty(property),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.properties] });
      dispatch(addUINotification({
        type: 'success',
        message: 'Property created successfully',
        timeout: 3000,
      }));
    },
    onError: (error: Error) => {
      dispatch(addUINotification({
        type: 'error',
        message: error.message || 'Failed to create property',
        timeout: 5000,
      }));
    },
  });
};

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: ({ id, property }: { id: string; property: Partial<Property> }) =>
      propertyService.updateProperty(id, property),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.properties] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.property, variables.id] });
      dispatch(addUINotification({
        type: 'success',
        message: 'Property updated successfully',
        timeout: 3000,
      }));
    },
    onError: (error: Error) => {
      dispatch(addUINotification({
        type: 'error',
        message: error.message || 'Failed to update property',
        timeout: 5000,
      }));
    },
  });
};

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (id: string) => propertyService.deleteProperty(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.properties] });
      dispatch(addUINotification({
        type: 'success',
        message: 'Property deleted successfully',
        timeout: 3000,
      }));
    },
    onError: (error: Error) => {
      dispatch(addUINotification({
        type: 'error',
        message: error.message || 'Failed to delete property',
        timeout: 5000,
      }));
    },
  });
};

export const usePropertyTypes = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.propertyTypes],
    queryFn: () => propertyService.getPropertyTypes(),
    select: (data) => data.data,
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

export const usePropertyStatuses = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.propertyStatuses],
    queryFn: () => propertyService.getPropertyStatuses(),
    select: (data) => data.data,
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

export const useSearchProperties = (query: string, params?: PropertyQueryParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.properties, 'search', query, params],
    queryFn: () => propertyService.searchProperties(query, params),
    select: (data) => data.data,
    enabled: !!query && query.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
