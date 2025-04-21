import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-8">
      <div className="mb-4">
        <h2 className="text-4xl font-serif font-semibold">Nachhilfeangebote</h2>
        <p className="text-md text-muted-foreground">Finde passende Angebote</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-52 w-full rounded-xl" />
          ))}
      </div>
    </div>
  );
}
