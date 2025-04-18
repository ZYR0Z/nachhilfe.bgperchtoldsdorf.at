import { NewTutor } from "@/actions/tutorActions";
import OfferForm from "@/components/offer-form";
import { getAllSubjects } from "@/actions/subjectActions";
import { auth } from "@/auth";
import { signIn } from "next-auth/react";

export default async function NewTutoringOffer() {
  const subjects = await getAllSubjects();
  const grades = Array.from({ length: 8 }, (_, i) => i + 1);
  const session = await auth();
  if (!session?.user?.email || !session.user.name)
    return signIn("/nachhilfe-anbieten/neu");
  const { email, name, image } = session.user;

  // TODO: maybe we can also create a wrapper for this type
  // TODO: once we have ldap auth working, this wont be necessary
  const tutor: NewTutor = {
    user_class: "7D",
    name: name,
    profile_picture: image,
    id: email,
    email,
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <OfferForm subjects={subjects} grades={grades} tutor={tutor} />
    </div>
  );
}
