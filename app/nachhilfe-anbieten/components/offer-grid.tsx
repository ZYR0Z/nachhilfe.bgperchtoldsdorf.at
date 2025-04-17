import { mockTutoringOffers } from "@/lib/mock-data";
import OfferCard from "./offer-card";

// TODO: infer it from drizzle
// FIXME: help what is this
type Offers = typeof mockTutoringOffers;

export default function OfferGrid({ offers }: { offers: Offers }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
}
