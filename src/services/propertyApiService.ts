import {
  Property,
  PropertyDetail,
  CreatePropertyRequest,
  UpdatePropertyRequest,
  PropertyFilterRequest,
  ApiResponse,
  PagedResult,
} from '../schemas/propertySchemas';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
class PropertyApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const defaultHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };

      const config: RequestInit = {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      };

      console.log(`Making request to: ${url}`, config);

      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  /**
   * Get paginated list of properties with optional filters
   */
  async getProperties(filters?: Partial<PropertyFilterRequest>): Promise<ApiResponse<PagedResult<Property>>> {
    const queryParams = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, String(value));
        }
      });
    }

    const endpoint = `/api/properties${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.makeRequest<PagedResult<Property>>(endpoint);
  }

  /**
   * Get a specific property by ID with detailed information
   */
  async getPropertyById(id: string): Promise<ApiResponse<PropertyDetail>> {
    return this.makeRequest<PropertyDetail>(`/api/properties/${id}`);
  }

  /**
   * Create a new property
   */
  async createProperty(data: CreatePropertyRequest): Promise<ApiResponse<Property>> {
    return this.makeRequest<Property>('/api/properties', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Update an existing property
   */
  async updateProperty(id: string, data: UpdatePropertyRequest): Promise<ApiResponse<Property>> {
    return this.makeRequest<Property>(`/api/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * Delete a property (soft delete)
   */
  async deleteProperty(id: string): Promise<ApiResponse<boolean>> {
    return this.makeRequest<boolean>(`/api/properties/${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * Test API connection
   */
  async testConnection(): Promise<boolean> {
    try {
      const response = await this.getProperties({ page: 1, pageSize: 1 });
      return response.success;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const propertyApiService = new PropertyApiService();
export default propertyApiService;