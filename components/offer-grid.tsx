import { TutoringOffer } from "@/actions/offerActions";
import OfferCard from "@/components/offer-card";
import { cn } from "@/lib/utils";

export default function OfferGrid({
  offers,
  className,
}: {
  offers: TutoringOffer[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
        className,
      )}
    >
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
}
