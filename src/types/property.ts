export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: PropertyType;
  status: PropertyStatus;
  size: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  features: string[];
  createdAt: string;
  updatedAt: string;
}

export enum PropertyType {
  House = 0,
  Apartment = 1,
  Condo = 2,
  Townhouse = 3,
  Villa = 4,
  Land = 5,
  Commercial = 6
}

export enum PropertyStatus {
  Available = 0,
  Sold = 1,
  Rented = 2,
  Pending = 3
}

export interface PropertyFilters {
  location?: string;
  type?: PropertyType;
  status?: PropertyStatus;
  minPrice?: number;
  maxPrice?: number;
  minSize?: number;
  maxSize?: number;
  bedrooms?: number;
  bathrooms?: number;
}

export interface PropertyQueryParams extends PropertyFilters {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PropertyListResponse {
  properties: Property[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}
