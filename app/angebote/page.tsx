import { getAllOffers } from "@/actions/offerActions";
import OfferCard from "@/components/offer/card";
import { auth } from "@/auth";

export default async function FindTutoring() {
  // TODO: add filtering
  const offers = await getAllOffers();
  const session = await auth();

  return (
    <div className="p-8">
      <div className="mb-4">
        <h2 className="text-4xl font-serif font-semibold">Nachhilfeangebote</h2>
        <p className="text-md text-muted-foreground">Finde passende Angebote</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} user={session?.user} />
        ))}
      </div>
    </div>
  );
}
