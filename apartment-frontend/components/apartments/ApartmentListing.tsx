"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, SearchX } from "lucide-react";

import { ApartmentCard } from "./ApartmentCard";
import { ApartmentFilters } from "./ApartmentFilters";
import { Pagination } from "./Pagination";
import { ApartmentCardSkeleton } from "./ApartmentCardSkeleton";

import type {
  Apartment,
  ApartmentFilters as ApartmentFiltersType,
  ApartmentsResponse,
} from "@/types/apartment";

import { getApartments } from "@/services/apartments.service";

const LIMIT = 6;

export function ApartmentListing() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const city = searchParams.get("city") ?? "";
  const minPrice = searchParams.get("minPrice") ?? "";
  const maxPrice = searchParams.get("maxPrice") ?? "";
  const bedrooms = searchParams.get("bedrooms") ?? "";

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.max(1, Number(searchParams.get("limit")) || LIMIT);

  const hasMultiplePages = totalPages > 1;
  const canGoPrevious = page > 1;
  const canGoNext = page < totalPages;

  useEffect(() => {
    let isActive = true;

    async function loadApartments() {
      try {
        setIsLoading(true);
        setError("");

        const filters: ApartmentFiltersType = {
          city: city || undefined,
          minPrice: minPrice ? Number(minPrice) : undefined,
          maxPrice: maxPrice ? Number(maxPrice) : undefined,
          bedrooms: bedrooms ? Number(bedrooms) : undefined,
          page,
          limit,
        };

        const response: ApartmentsResponse =
          await getApartments(filters);

        if (!isActive) return;
        setApartments(response.data);
        setTotal(response.meta.total);
        setTotalPages(response.meta.totalPages);
      } catch (err) {
        if (!isActive) return;

        console.error(err);

        setError("Unable to load apartments. Please try again.");
        setApartments([]);
        setTotal(0);
        setTotalPages(0);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadApartments();

    return () => {
      isActive = false;
    };
  }, [city, minPrice, maxPrice, bedrooms, page, limit]);

  function updateUrl(values: {
    city?: string;
    minPrice?: string;
    maxPrice?: string;
    bedrooms?: string;
    page?: number;
    limit?: number;
  }) {
    const params = new URLSearchParams();

    if (values.city?.trim()) {
      params.set("city", values.city.trim());
    }

    if (values.minPrice) {
      params.set("minPrice", values.minPrice);
    }

    if (values.maxPrice) {
      params.set("maxPrice", values.maxPrice);
    }

    if (values.bedrooms) {
      params.set("bedrooms", values.bedrooms);
    }

    params.set("page", String(values.page ?? 1));
    params.set("limit", String(values.limit ?? LIMIT));

    router.push(`/?${params.toString()}`, {
      scroll: false,
    });
  }

  function handleSearch(values: {
    city: string;
    minPrice: string;
    maxPrice: string;
    bedrooms: string;
  }) {
    updateUrl({
      ...values,
      page: 1,
      limit,
    });
  }

  function handleReset() {
    updateUrl({
      page: 1,
      limit: LIMIT,
    });
  }

  function handlePageChange(newPage: number) {
    if (
      isLoading ||
      newPage < 1 ||
      newPage > totalPages ||
      newPage === page
    ) {
      return;
    }

    updateUrl({
      city,
      minPrice,
      maxPrice,
      bedrooms,
      page: newPage,
      limit,
    });
  }

  function handlePrevious() {
    if (canGoPrevious) {
      handlePageChange(page - 1);
    }
  }

  function handleNext() {
    if (canGoNext) {
      handlePageChange(page + 1);
    }
  }

  return (
    <div
      className="mt-5 sm:mt-6"
      aria-busy={isLoading}
    >
      {/* Filters */}
      <ApartmentFilters
        initialCity={city}
        initialMinPrice={minPrice}
        initialMaxPrice={maxPrice}
        initialBedrooms={bedrooms}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      {/* Results header */}
      <div className="mt-5 flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {isLoading
              ? "Finding apartments..."
              : `${total} apartment${total === 1 ? "" : "s"} found`}
          </p>

          {!isLoading && hasMultiplePages && (
            <p className="mt-0.5 text-xs text-slate-500">
              Page {page} of {totalPages}
            </p>
          )}
        </div>

        {/* Mobile / Tablet navigation */}
        {!isLoading && hasMultiplePages && (
          <div className="flex items-center gap-2 xl:hidden">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={!canGoPrevious}
              aria-label="Previous apartments"
              className="flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="size-4" />
            </button>

            <span className="min-w-12 text-center text-xs font-semibold text-slate-500">
              {page} / {totalPages}
            </span>

            <button
              type="button"
              onClick={handleNext}
              disabled={!canGoNext}
              aria-label="Next apartments"
              className="flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        )}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {Array.from({ length: LIMIT }).map((_, index) => (
            <ApartmentCardSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Error */}
      {!isLoading && error && (
        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-5 text-center">
          <p className="text-sm font-semibold text-red-700">
            {error}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-2 text-sm font-semibold text-red-700 underline underline-offset-4"
          >
            Try again
          </button>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && apartments.length === 0 && (
        <div className="mt-5 flex min-h-60 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-white shadow-sm">
            <SearchX className="size-5 text-slate-400" />
          </div>

          <h3 className="mt-4 text-base font-bold text-slate-900">
            No apartments found
          </h3>

          <p className="mt-1 max-w-sm text-sm leading-6 text-slate-500">
            Try changing your filters or searching in another city.
          </p>
        </div>
      )}

      {/* Cards */}
      {!isLoading && !error && apartments.length > 0 && (
        <div className="relative mt-5">
          {/* Desktop Previous Arrow */}
          {hasMultiplePages && (
            <button
              type="button"
              onClick={handlePrevious}
              disabled={!canGoPrevious}
              aria-label="Previous apartments"
              className="absolute -left-5 top-1/2 z-20 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-lg shadow-slate-200/50 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-30 xl:flex"
            >
              <ChevronLeft className="size-5" />
            </button>
          )}

          {/* Apartment Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {apartments.map((apartment) => (
              <ApartmentCard
                key={apartment.id}
                apartment={apartment}
              />
            ))}
          </div>

          {/* Desktop Next Arrow */}
          {hasMultiplePages && (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canGoNext}
              aria-label="Next apartments"
              className="absolute -right-5 top-1/2 z-20 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-lg shadow-slate-200/50 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-30 xl:flex"
            >
              <ChevronRight className="size-5" />
            </button>
          )}
        </div>
      )}

      {/* Bottom Pagination */}
      {!isLoading && !error && apartments.length > 0 && hasMultiplePages && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}