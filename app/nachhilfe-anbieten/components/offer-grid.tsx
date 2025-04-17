import Link from "next/link";
import { Badge } from "@/components/ui/badge";
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
import { Button } from "@/components/ui/button";
import { mockTutoringOffers } from "@/lib/mock-data";
import { Pencil, Trash2 } from "lucide-react";

// TODO: infer it from drizzle
// FIXME: help what is this
type Offers = typeof mockTutoringOffers;

export default function OfferGrid({ offers }: { offers: Offers }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {offers.map((offer) => (
        <div key={offer.id} className="border p-4 my-2">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">{offer.subject.name}</h2>
            <div className="flex items-center gap-2 ml-auto">
              {/* TODO: make the width & height the same bc what is this??? */}
              <Button variant="outline" className="aspect-square w-10">
                <Link href={`/nachhilfe-anbieten/${offer.id}`}>
                  <Pencil />
                </Link>
              </Button>
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
                      Bist du dir sicher, dass du dieses Angebot löschen
                      möchtest?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Dise Aktion kann nicht rückgängig gemacht werden. Wir
                      werden das Angebot unwiderruflich von unseren Servern
                      löschen.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                    <AlertDialogAction>Löschen</AlertDialogAction>
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
      ))}
    </div>
  );
}
