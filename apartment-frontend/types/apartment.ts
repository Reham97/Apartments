export interface Apartment {
  id: number;
  title: string;
  description: string | null;
  address: string;
  city: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  isVerified: boolean;
  contactPhone: string;
  images: string[];
}

export interface ApartmentFilters {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  page?: number;
  limit?: number;
}

export interface ApartmentsResponse {
  data: Apartment[];
  meta: ApartmentsPaginationResponseMetaData

}

export interface ApartmentsPaginationResponseMetaData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateApartmentPayload {
  title: string;
  description?: string;
  address: string;
  city: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  contactPhone: string;
  images: string[];
}