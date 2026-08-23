import { ApartmentListing } from "@/components/apartments/ApartmentListing";
import { ValuesSection } from "@/components/apartments/ValuesSection";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50">
        <section
          id="apartments"
          className="scroll-mt-16 py-5 sm:py-8 lg:py-10"
        >
          <Container>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
              {/* Main Search Area */}
              <div className="min-w-0">
                <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-7">
                  {/* Heading */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                      Explore homes
                    </p>

                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                      Find your next home
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Search apartments by city, price range, and number of
                      bedrooms.
                    </p>
                  </div>

                  {/* Listing */}
                  <ApartmentListing />
                </div>
              </div>

              {/* Values Sidebar */}
              <aside className="lg:sticky lg:top-20">
                <ValuesSection />
              </aside>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}