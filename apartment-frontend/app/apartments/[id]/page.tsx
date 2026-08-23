import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Bath,
  BedDouble,
  Building2,
  Images,
  MapPin,
  Maximize,
  Phone,
} from "lucide-react";

import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { getApartmentById } from "@/services/apartments.service";

interface ApartmentDetailsPageProps {
  params: Promise<{ id: string; }>;
}

export default async function ApartmentDetailsPage({ params }: ApartmentDetailsPageProps) {
  const { id } = await params;

  const apartment = await getApartmentById(id).catch(() => null);

  if (!apartment) {
    notFound();
  }

  const images = apartment.images ?? [];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50 pb-10">
        <Container>
          {/* ================================PAGE HEADER================================ */}
          <section className="border-b border-slate-200 py-5 sm:py-7">
            <div className="flex items-start gap-4">
              {/* Back */}
              <Link
                href="/#apartments"
                className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                aria-label="Back to apartments"
              >
                <ArrowLeft className="size-5" />
              </Link>

              {/* Apartment info */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                        {apartment.title}
                      </h1>

                      {apartment.isVerified && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                          <BadgeCheck className="size-4" />
                          Verified
                        </span>
                      )}
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                      <MapPin className="size-4 shrink-0 text-blue-600" />

                      <span>
                        {apartment.address}, {apartment.city}
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="shrink-0 lg:text-right">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Monthly rent
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-950 sm:text-3xl">
                      ${Number(apartment.price).toLocaleString()}

                      <span className="ml-1 text-sm font-medium text-slate-400">
                        / month
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================================QUICK FACTS================================ */}
          <section className="grid grid-cols-2 gap-3 py-5 sm:grid-cols-4">
            <QuickFact
              icon={<BedDouble className="size-5" />}
              value={apartment.bedrooms}
              label="Bedrooms"
            />

            <QuickFact
              icon={<Bath className="size-5" />}
              value={apartment.bathrooms}
              label="Bathrooms"
            />

            <QuickFact
              icon={<Maximize className="size-5" />}
              value={`${apartment.area} m²`}
              label="Area"
            />

            <QuickFact
              icon={<Building2 className="size-5" />}
              value={apartment.city}
              label="City"
            />
          </section>

          {/* ================================MAIN LAYOUT================================ */}
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            {/* LEFT CONTENT */}
            <div className="min-w-0 space-y-6">
              {/* =================================================
                  DESCRIPTION
              ================================================= */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <SectionTitle
                  icon={<Building2 className="size-5" />}
                  title="About this apartment"
                />

                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base">
                  {apartment.description ||
                    "No description has been provided for this apartment yet."}
                </p>
              </section>

              {/* =================================================
                  PHOTOS - 3 COLUMNS
              ================================================= */}
              {images.length > 0 && (
                <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <SectionTitle
                      icon={<Images className="size-5" />}
                      title="Property photos"
                    />

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                      {images.length} photos
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {images.map((image, index) => (
                      <div
                        key={`${image}-${index}`}
                        className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100"
                      >
                        <img
                          src={image}
                          alt={`${apartment.title} - Photo ${index + 1}`}
                          className="size-full object-cover transition duration-300 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

                        <span className="absolute bottom-2 left-2 rounded-md bg-black/50 px-2 py-1 text-[10px] font-medium text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                          Photo {index + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* =================================================
                  PROPERTY DETAILS
              ================================================= */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <SectionTitle
                  icon={<Building2 className="size-5" />}
                  title="Property details"
                />

                <div className="mt-5 grid divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                  <DetailItem
                    label="Bedrooms"
                    value={`${apartment.bedrooms}`}
                  />

                  <DetailItem
                    label="Bathrooms"
                    value={`${apartment.bathrooms}`}
                  />

                  <DetailItem
                    label="Area"
                    value={`${apartment.area} m²`}
                  />

                  <DetailItem
                    label="City"
                    value={apartment.city}
                  />
                </div>
              </section>

              {/* =================================================
                  LOCATION
              ================================================= */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <SectionTitle
                  icon={<MapPin className="size-5" />}
                  title="Location"
                />

                <div className="mt-5 flex items-start gap-4 rounded-xl bg-slate-50 p-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                    <MapPin className="size-5" />
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      {apartment.address}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {apartment.city}
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* =================================================
                SIDEBAR
            ================================================= */}
            <aside className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/40 sm:p-6">
                {/* Price */}
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Monthly rent
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                    ${Number(apartment.price).toLocaleString()}

                    <span className="ml-1 text-sm font-medium text-slate-400">
                      / month
                    </span>
                  </p>
                </div>

                <div className="my-6 h-px bg-slate-100" />

                {/* Contact */}
                <div className="flex items-start gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Phone className="size-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900">
                      Interested?
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Contact the listing representative to learn more.
                    </p>
                  </div>
                </div>

                <a
                  href={`tel:${apartment.contactPhone}`}
                  className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-bold text-white transition hover:bg-blue-600 active:scale-[0.98]"
                >
                  <Phone className="size-4" />
                  Call now
                </a>

                <p className="mt-3 text-center text-sm font-semibold text-slate-600">
                  {apartment.contactPhone}
                </p>

                {/* Status */}
                <div
                  className={`mt-5 rounded-xl border p-4 ${apartment.isVerified
                    ? "border-blue-100 bg-blue-50"
                    : "border-amber-200 bg-amber-50"
                    }`}
                >
                  {apartment.isVerified ? (
                    <div className="flex items-start gap-3">
                      <BadgeCheck className="mt-0.5 size-5 shrink-0 text-blue-600" />

                      <div>
                        <p className="text-sm font-bold text-blue-800">
                          Verified listing
                        </p>

                        <p className="mt-1 text-xs leading-5 text-blue-700">
                          This property has been reviewed and verified.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs leading-5 text-amber-800">
                      This listing is currently pending verification.
                      Please confirm all details directly.
                    </p>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </main>
    </>
  );
}

function QuickFact({ icon, value, label }: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="truncate text-lg font-bold text-slate-950">
          {value}
        </p>

        <p className="text-xs text-slate-500">
          {label}
        </p>
      </div>
    </div>
  );
}

function SectionTitle({ icon, title, }: { icon: React.ReactNode; title: string; }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        {icon}
      </div>

      <h2 className="text-lg font-bold text-slate-950">
        {title}
      </h2>
    </div>
  );
}

function DetailItem({ label, value, }: { label: string; value: string; }) {
  return (
    <div className="p-4">
      <p className="text-xs font-medium text-slate-400">
        {label}
      </p>

      <p className="mt-1 font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}