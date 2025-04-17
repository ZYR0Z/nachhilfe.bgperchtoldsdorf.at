import { auth } from "@/auth";
import { redirect } from "next/navigation";
import OfferGrid from "./components/offer-grid";
import { Button } from "@/components/ui/button";
import { mockTutoringOffers } from "@/lib/mock-data";
import Link from "next/link";

export default async function OfferTutoring() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/login?callbackUrl=/nachhilfe-anbieten");
  }

  const { name } = session.user;

  // NOTE: we want to list all the tutoring offers the user has made and be able to edit and delete them (even bulk delete)
  // we also want to be able to create a new tutoring offer
  // and if there is no tutoring offer, we automatically redirect to the /nachhilfe-anbieten/neu page
  return (
    <div className="p-8">
      <p className="text-md text-muted-foreground">
        Willkommen <span className="italic">{name}</span>.
      </p>
      <div className="flex items-center">
        <h1 className="text-4xl font-serif font-semibold">Deine Angebote</h1>
        <Button className="ml-auto">
          <Link href="/nachhilfe-anbieten/neu">Neues Angebot erstellen</Link>
        </Button>
      </div>
      <div className="mt-4">
        <OfferGrid offers={mockTutoringOffers} />
      </div>
    </div>
  );
}
