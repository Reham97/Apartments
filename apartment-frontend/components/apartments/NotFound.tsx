import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <>
      <Header />

      <main className="flex min-h-[70vh] items-center">
        <Container>
          <div className="mx-auto max-w-lg text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Home className="size-8" />
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-blue-600">
              404 error
            </p>

            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
              Apartment not found
            </h1>

            <p className="mt-4 text-slate-500">
              The apartment you are looking for doesn&apos;t exist or may have
              been removed.
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <ArrowLeft className="size-4" />
              Back to apartments
            </Link>
          </div>
        </Container>
      </main>
    </>
  );
}