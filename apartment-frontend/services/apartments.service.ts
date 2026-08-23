import type {
  Apartment,
  ApartmentFilters,
  ApartmentsResponse,
} from "@/types/apartment";


export async function createApartment(
  formData: FormData,
): Promise<Apartment> {
  const API_URL = getApiUrl();

  if (!API_URL) {
    throw new Error("API URL is not configured.");
  }
  const response = await fetch(
    `${API_URL}/apartments`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    const data = await response.json().catch(() => null);

    throw new Error(
      Array.isArray(data?.message)
        ? data.message.join(", ")
        : data?.message || "Unable to create apartment.",
    );
  }

  return response.json();
}

export async function getApartments(
  filters: ApartmentFilters,
): Promise<ApartmentsResponse> {
  const params = new URLSearchParams();

  if (filters.city) {
    params.set("city", filters.city);
  }

  if (filters.minPrice !== undefined) {
    params.set("minPrice", String(filters.minPrice));
  }

  if (filters.maxPrice !== undefined) {
    params.set("maxPrice", String(filters.maxPrice));
  }

  if (filters.bedrooms !== undefined) {
    params.set("bedrooms", String(filters.bedrooms));
  }

  if (filters.page !== undefined) {
    params.set("page", String(filters.page));
  }

  if (filters.limit !== undefined) {
    params.set("limit", String(filters.limit));
  }

  const API_URL = getApiUrl();

  if (!API_URL) {
    throw new Error("API URL is not configured.");
  }

  const response = await fetch(
    `${API_URL}/apartments?${params.toString()}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Unable to load apartments.");
  }

  return response.json();
}

export async function getApartmentById( id: string | number,): Promise<Apartment> {
  const API_URL = getApiUrl();

  if (!API_URL) {
    throw new Error("API URL is not configured.");
  }
  const response = await fetch(`${API_URL}/apartments/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Apartment not found.");
  }

  return response.json();
}


const getApiUrl = () => {
  if (typeof window === "undefined") {
    return process.env.API_URL;
  }

  return process.env.NEXT_PUBLIC_API_URL;
};