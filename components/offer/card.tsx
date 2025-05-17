import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import EditButtons from "@/components/offer/edit-buttons";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { TutoringOffer } from "@/actions/offerActions";
import { Grade } from "@/actions/gradeActions";
import { User } from "next-auth";

interface OfferCardProps {
  offer: TutoringOffer;
  variant?: "view" | "edit" | "admin";
  user?: User | null;
  filters?: {
    grades?: Grade[];
  };
}

export default function OfferCard({
  offer,
  variant = "view",
  filters,
  user = null,
}: OfferCardProps) {
  return (
    <Card key={offer.id} className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex">
          {offer.subject.name}
          {(variant != "view" ||
            user?.id === offer.tutor_id ||
            user?.department === "admin") && <EditButtons id={offer.id} />}
        </CardTitle>
        <CardDescription>
          <div>
            Angeboten von {offer.tutor.name} ({offer.tutor.department})
            <div className="flex w-full mt-2">
              <p className="mr-4">Klassen:</p>
              <div className="flex flex-wrap gap-2">
                {offer.grades.map((grade) => (
                  <Badge
                    key={grade}
                    variant="default"
                    className={cn(
                      "bg-primary/70 rounded-lg text-xs font-semibold",
                      {
                        "bg-primary": filters?.grades?.includes(grade),
                      },
                    )}
                  >
                    {grade}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="border-y py-4">
        <p className="text-sm text-muted-foreground mb-4">Beschreibung:</p>
        <p className="italic">{offer.description}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/angebote/${offer.id}`}>
          <Button className="cursor-pointer">Details anzeigen</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
