import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function OfferTutoring() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/login?callbackUrl=/nachhilfe-anbieten");
  }
  // we want to list all the tutoring offers the user has made and be able to edit and delete them (even bulk delete)
  // we also want to be able to create a new tutoring offer
  // and if there is no tutoring offer, we automatically redirect to the /nachhilfe-anbieten/neu page
  return <>Willkommen {session.user.name}!</>;
}
