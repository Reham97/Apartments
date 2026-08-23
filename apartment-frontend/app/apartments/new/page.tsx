import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Clock3,
  ImagePlus,
  ShieldCheck,
} from "lucide-react";

import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { ApartmentForm } from "@/components/apartments/ApartmentForm";

export default function CreateApartmentPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50 pb-16 pt-8 sm:pb-24 sm:pt-12">
        <Container>
          {/* Back */}
          <Link
            href="/#apartments"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft className="size-4" />
            Back to apartments
          </Link>

          <div className="mx-auto mt-8 max-w-3xl sm:mt-10">
            {/* Heading */}
            <div className="text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <Building2 className="size-7" />
              </div>

              <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-blue-600">
                New listing
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Add a new apartment
              </h1>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                Add accurate property details and photos to help people find
                the right home.
              </p>
            </div>

            {/* Review notice */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-sm">
              <div className="flex gap-4 p-5 sm:p-6">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Clock3 className="size-5" />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Your listing will be reviewed
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    New apartment listings are initially marked as{" "}
                    <span className="font-semibold text-amber-700">
                      unverified
                    </span>
                    . Please provide accurate information and genuine property
                    photos.
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="flex items-start gap-2 rounded-xl bg-slate-50 p-3">
                      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-blue-600" />

                      <p className="text-xs leading-5 text-slate-500">
                        An administrator will review the property details before
                        marking the listing as verified.
                      </p>
                    </div>

                    <div className="flex items-start gap-2 rounded-xl bg-slate-50 p-3">
                      <ImagePlus className="mt-0.5 size-4 shrink-0 text-blue-600" />

                      <p className="text-xs leading-5 text-slate-500">
                        Upload clear, genuine images of the apartment to help
                        users understand the property better.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-1 bg-gradient-to-r from-amber-400 via-blue-500 to-blue-600" />
            </div>

            {/* Form */}
            <div className="mt-8 sm:mt-10">
              <ApartmentForm />
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}