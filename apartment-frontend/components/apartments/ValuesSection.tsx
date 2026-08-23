import {
  BadgeCheck,
  HeartHandshake,
  Search,
  ShieldCheck,
  Target,
} from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "Making apartment hunting simpler, faster, and more transparent.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Listings",
    description:
      "Clear property details to help you make better decisions.",
  },
  {
    icon: ShieldCheck,
    title: "Built on Trust",
    description:
      "New listings are reviewed to help keep information reliable.",
  },
  {
    icon: Search,
    title: "Find It Faster",
    description:
      "Smart filters help you discover apartments that fit your needs.",
  },
  {
    icon: HeartHandshake,
    title: "Why Choose Us?",
    description:
      "A simple experience designed around finding your next home.",
  },
];

export function ValuesSection() {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="rounded-2xl bg-slate-900 p-5 text-white">
        <div className="flex size-11 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">
          <HeartHandshake className="size-5" />
        </div>

        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
          Our promise
        </p>

        <h2 className="mt-2 text-xl font-bold leading-tight">
          A better way to find
          <span className="block text-blue-300">your next home.</span>
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-300">
          Everything we build is focused on making your apartment search
          easier and more reliable.
        </p>
      </div>

      {/* Values */}
      <div className="relative mt-5 space-y-1">
        {/* Vertical line - desktop */}
        <div className="absolute bottom-5 left-5 top-5 hidden w-px bg-slate-100 sm:block" />

        {values.map((value, index) => {
          const Icon = value.icon;

          return (
            <article
              key={value.title}
              className="group relative flex gap-4 rounded-2xl p-3 transition duration-300 hover:bg-blue-50/70"
            >
              {/* Number / Icon */}
              <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-white text-blue-600 shadow-sm transition duration-300 group-hover:scale-110 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white">
                <Icon className="size-4" />
              </div>

              {/* Content */}
              <div className="min-w-0 pt-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-blue-500">
                    0{index + 1}
                  </span>

                  <h3 className="text-sm font-bold text-slate-900">
                    {value.title}
                  </h3>
                </div>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {value.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      {/* Bottom accent */}
      <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">
        <p className="text-sm font-semibold text-slate-900">
          Search. Compare. Find home.
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          Your next apartment could be just a few clicks away.
        </p>
      </div>
    </section>
  );
}