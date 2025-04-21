import { NewTutor } from "@/actions/tutorActions";
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
  if (!session?.user?.email || !session.user.name)
    return signIn(undefined, {
      redirectTo: `/angebote/${id}/bearbeiten`,
    });
  const { email, name, image } = session.user;

  const subjects = await getAllSubjects();
  const grades = Array.from({ length: 8 }, (_, i) => i + 1);

  const tutor: NewTutor = {
    user_class: "7D",
    name: name,
    profile_picture: image,
    id: email,
    email,
  };

  // TODO: should we create a new page for this?
  // and also once db supports isAdmin we can check if the user is admin
  if (offer.tutor.id !== tutor.id) {
    return notFound();
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <OfferForm
        subjects={subjects}
        grades={grades}
        tutor={tutor}
        offer={offer}
      />
    </div>
  );
}
