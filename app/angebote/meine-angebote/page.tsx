import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import OfferCard from "@/components/offer/card";
import Link from "next/link";
import { CirclePlus } from "lucide-react";
import { getOffersByTutorId } from "@/actions/offerActions";

export default async function OfferTutoring() {
  const session = await auth();
  if (!session?.user?.id) {
    return signIn(undefined, {
      redirectTo: "/angebote/meine-angebote",
    });
  }

  const offers = await getOffersByTutorId(session.user.id);

  const { name } = session.user;

  return (
    <div className="p-8">
      <div className="flex items-center">
        <div>
          <h1 className="text-4xl font-serif font-semibold">Deine Angebote</h1>
          <p className="text-md text-muted-foreground">
            Willkommen <span className="italic">{name}</span>.
          </p>
        </div>
        <Button className="ml-auto">
          <CirclePlus />
          <Link href="/angebote/neu">Neues Angebot</Link>
        </Button>
      </div>
      <div className="mt-4">
        {offers.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {offers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} variant="edit" />
            ))}
          </div>
        ) : (
          <>
            <p className="text-md text-muted-foreground">
              Du hast noch keine Angebote erstellt.
              <Link href="/angebote/neu" className="underline">
                Erstelle jetzt dein erstes Angebot!
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
