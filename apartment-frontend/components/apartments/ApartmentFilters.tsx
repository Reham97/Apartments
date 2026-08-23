"use client";

import { useEffect, useState } from "react";
import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";

interface ApartmentFiltersProps {
  initialCity?: string;
  initialMinPrice?: string;
  initialMaxPrice?: string;
  initialBedrooms?: string;
  onSearch: (filters: {
    city: string;
    minPrice: string;
    maxPrice: string;
    bedrooms: string;
  }) => void;
  onReset: () => void;
}

export function ApartmentFilters({
  initialCity = "",
  initialMinPrice = "",
  initialMaxPrice = "",
  initialBedrooms = "",
  onSearch,
  onReset,
}: ApartmentFiltersProps) {
  const [city, setCity] = useState(initialCity);
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [bedrooms, setBedrooms] = useState(initialBedrooms);

  // Keep inputs synchronized with URL filters
  useEffect(() => {
    setCity(initialCity);
    setMinPrice(initialMinPrice);
    setMaxPrice(initialMaxPrice);
    setBedrooms(initialBedrooms);
  }, [
    initialCity,
    initialMinPrice,
    initialMaxPrice,
    initialBedrooms,
  ]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSearch({
      city: city.trim(),
      minPrice,
      maxPrice,
      bedrooms,
    });
  }

  function handleReset() {
    setCity("");
    setMinPrice("");
    setMaxPrice("");
    setBedrooms("");

    onReset();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-5 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4"
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <SlidersHorizontal className="size-4" />
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Search filters
            </h2>

            <p className="text-xs text-slate-500">
              Find apartments that match your needs
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <RotateCcw className="size-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {/* City */}
        <FilterField label="City">
          <input
            id="city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="e.g. Cairo"
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </FilterField>

        {/* Min price */}
        <FilterField label="Min price">
          <input
            id="minPrice"
            type="number"
            min="0"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
            placeholder="Min"
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </FilterField>

        {/* Max price */}
        <FilterField label="Max price">
          <input
            id="maxPrice"
            type="number"
            min="0"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            placeholder="Max"
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </FilterField>

        {/* Bedrooms */}
        <FilterField label="Bedrooms">
          <select
            id="bedrooms"
            value={bedrooms}
            onChange={(event) => setBedrooms(event.target.value)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          >
            <option value="">Any</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4 Bedrooms</option>
            <option value="5">5+ Bedrooms</option>
          </select>
        </FilterField>
      </div>

      {/* Search button */}
      <button
        type="submit"
        className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99] sm:w-auto sm:min-w-40"
      >
        <Search className="size-4" />
        Search apartments
      </button>
    </form>
  );
}

interface FilterFieldProps {
  label: string;
  children: React.ReactNode;
}

function FilterField({ label, children }: FilterFieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-600">
        {label}
      </label>

      {children}
    </div>
  );
}