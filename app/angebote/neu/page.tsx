import OfferForm from "@/components/offer/form";
import { getAllSubjects } from "@/actions/subjectActions";
import { auth, signIn } from "@/auth";

export default async function Page() {
  const subjects = await getAllSubjects();
  const grades = Array.from({ length: 8 }, (_, i) => i + 1);
  const session = await auth();
  if (!session?.user?.id)
    return signIn("microsoft-entra-id", { redirectTo: "/angebote/neu" });
  return (
    <div className="max-w-5xl mx-auto p-8">
      <OfferForm subjects={subjects} grades={grades} tutor={session.user} />
    </div>
  );
}
