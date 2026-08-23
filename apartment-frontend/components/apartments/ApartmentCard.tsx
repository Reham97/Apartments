import Link from "next/link";
import {
  BadgeCheck,
  Bath,
  BedDouble,
  Building2,
  MapPin,
} from "lucide-react";

import type { Apartment } from "@/types/apartment";

interface ApartmentCardProps {
  apartment: Apartment;
}

export function ApartmentCard({ apartment }: ApartmentCardProps) {
  const firstImage = apartment.images?.[0];

  return (
    <Link
      href={`/apartments/${apartment.id}`}
      className="group relative block overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/60"
    >
      {/* Visual */}
      <div className="relative h-28 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 sm:h-32">
        {firstImage ? (
          <img
            src={firstImage}
            alt={apartment.title}
            className="size-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <>
            {/* Decorative background */}
            <div className="absolute -right-8 -top-8 size-28 rounded-full bg-white/10" />
            <div className="absolute -bottom-10 -left-8 size-32 rounded-full bg-white/10" />

            <div className="relative flex size-full items-center justify-center">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-sm transition duration-300 group-hover:scale-110">
                <Building2 className="size-6" />
              </div>
            </div>
          </>
        )}

        {/* Dark overlay for better readability */}
        {firstImage && (
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/10" />
        )}

        {/* Verified badge */}
        {apartment.isVerified && (
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-blue-600 px-2.5 py-1.5 text-[11px] font-bold text-white shadow-lg shadow-blue-900/20 backdrop-blur-md">
            <span className="flex size-4 items-center justify-center rounded-full bg-white text-blue-600">
              <BadgeCheck className="size-3" strokeWidth={3} />
            </span>

            <span>Verified</span>
          </div>
        )}

        {/* Price */}
        <div className="absolute bottom-3 right-3 rounded-xl bg-slate-950/50 px-3 py-1.5 text-sm font-bold text-white backdrop-blur-md">
          ${Number(apartment.price).toLocaleString()}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="truncate text-base font-bold text-slate-900 transition group-hover:text-blue-600">
          {apartment.title}
        </h2>

        {/* Location */}
        <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin className="size-4 shrink-0 text-blue-500" />

          <span className="truncate">{apartment.city}</span>
        </div>

        {/* Minimal details */}
        <div className="mt-4 flex items-center gap-4 border-t border-slate-100 pt-3 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1.5">
            <BedDouble className="size-4 text-blue-600" />
            <span>{apartment.bedrooms} Beds</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Bath className="size-4 text-blue-600" />
            <span>{apartment.bathrooms} Baths</span>
          </div>
        </div>
      </div>
    </Link>
  );
}