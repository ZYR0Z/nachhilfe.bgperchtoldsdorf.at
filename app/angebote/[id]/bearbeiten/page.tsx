import OfferForm from "@/components/offer/form";
import { getAllSubjects } from "@/actions/subjectActions";
import { auth, signIn } from "@/auth";
import { notFound } from "next/navigation";
import { getOfferById } from "@/actions/offerActions";

type Params = Promise<{ id: string }>;

export default async function Page({ params }: { params: Params }) {
  const id = Number((await params).id);
  if (isNaN(id)) notFound();

  const offer = (await getOfferById(id)) ?? notFound();

  const session = await auth();
  if (!session?.user?.id)
    return signIn("microsoft-entra-id", {
      redirectTo: `/angebote/${id}/bearbeiten`,
    });

  const subjects = await getAllSubjects();
  const grades = Array.from({ length: 8 }, (_, i) => i + 1);

  // TODO: should we create a new page for this?
  // and also once db supports isAdmin we can check if the user is admin
  if (offer.tutor.id !== session.user.id) {
    return notFound();
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <OfferForm
        subjects={subjects}
        grades={grades}
        tutor={session.user}
        offer={offer}
      />
    </div>
  );
}
