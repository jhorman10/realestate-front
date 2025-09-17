import { apiService } from './api';
import type { Property, PropertyQueryParams, PropertyListResponse, ApiResponse } from '../types/property';

export class PropertyService {
  private readonly endpoint = '/properties';

  async getProperties(params?: PropertyQueryParams): Promise<ApiResponse<PropertyListResponse>> {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });
    }

    const url = `${this.endpoint}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiService.get<PropertyListResponse>(url);
  }

  async getPropertyById(id: string): Promise<ApiResponse<Property>> {
    return apiService.get<Property>(`${this.endpoint}/${id}`);
  }

  async createProperty(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Property>> {
    return apiService.post<Property>(this.endpoint, property);
  }

  async updateProperty(id: string, property: Partial<Property>): Promise<ApiResponse<Property>> {
    return apiService.put<Property>(`${this.endpoint}/${id}`, property);
  }

  async deleteProperty(id: string): Promise<ApiResponse<void>> {
    return apiService.delete<void>(`${this.endpoint}/${id}`);
  }

  async getPropertyTypes(): Promise<ApiResponse<{ [key: number]: string }>> {
    return apiService.get<{ [key: number]: string }>(`${this.endpoint}/types`);
  }

  async getPropertyStatuses(): Promise<ApiResponse<{ [key: number]: string }>> {
    return apiService.get<{ [key: number]: string }>(`${this.endpoint}/statuses`);
  }

  async searchProperties(query: string, params?: PropertyQueryParams): Promise<ApiResponse<PropertyListResponse>> {
    const queryParams = new URLSearchParams();
    queryParams.append('search', query);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });
    }

    return apiService.get<PropertyListResponse>(`${this.endpoint}/search?${queryParams.toString()}`);
  }
}

export const propertyService = new PropertyService();
