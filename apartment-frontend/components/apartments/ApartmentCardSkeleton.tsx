export function ApartmentCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="aspect-[16/9] bg-slate-200" />

      <div className="space-y-3 p-4">
        <div className="h-5 w-3/4 rounded bg-slate-200" />

        <div className="h-4 w-full rounded bg-slate-100" />

        <div className="h-4 w-5/6 rounded bg-slate-100" />

        <div className="mt-4 flex gap-3 border-t border-slate-100 pt-3">
          <div className="h-4 w-12 rounded bg-slate-100" />
          <div className="h-4 w-12 rounded bg-slate-100" />
          <div className="h-4 w-12 rounded bg-slate-100" />
        </div>
      </div>
    </div>
  );
}