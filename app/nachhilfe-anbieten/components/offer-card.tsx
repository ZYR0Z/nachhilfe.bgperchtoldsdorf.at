import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2 } from "lucide-react";

// TODO: infer from the db schema
type Offer = (typeof import("@/lib/mock-data").mockTutoringOffers)[number];

export default function OfferCard({ offer }: { offer: Offer }) {
  return (
    <div key={offer.id} className="border p-4 my-2">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold">{offer.subject.name}</h2>
        <div className="flex items-center gap-2 ml-auto">
          {/* TODO: make the width & height the same bc what is this??? */}
          <Link href={`/nachhilfe-anbieten/${offer.id}`}>
            <Button
              variant="outline"
              className="cursor-pointer aspect-square w-10"
            >
              <Pencil />
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="cursor-pointer bg-destructive/90"
                variant="destructive"
              >
                <Trash2 />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Bist du dir sicher, dass du dieses Angebot löschen möchtest?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Dise Aktion kann nicht rückgängig gemacht werden. Wir werden
                  das Angebot unwiderruflich von unseren Servern löschen.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive">
                  Löschen
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="flex items-center gap-2 w-full border-y my-2 py-2">
        <p className="text-sm text-muted-foreground">Klassen:</p>
        {offer.grades.map((grade) => (
          <Badge
            key={grade}
            variant="default"
            className=" bg-foreground/40 rounded-lg text-xs font-semibold"
          >
            {grade}
          </Badge>
        ))}
      </div>
      <p className="text-foreground/90 italic">{offer.description}</p>
    </div>
  );
}
