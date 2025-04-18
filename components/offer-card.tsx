"use client";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { TutoringOffer } from "@/actions/offerActions";
import EditButtons from "./edit-buttons";

interface OfferCardProps {
  offer: TutoringOffer;
  variant?: "view" | "edit" | "admin";
  filters?: {
    subject?: string;
    grades?: number[];
  };
}

export default function OfferCard({
  offer,
  variant = "view",
  filters,
}: OfferCardProps) {
  return (
    <Card key={offer.id} className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex">
          {offer.subject.name}
          {variant != "view" && <EditButtons id={offer.id} />}
        </CardTitle>
        <CardDescription>
          <div>
            Angeboten von {offer.tutor.name} ({offer.tutor.user_class})
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
        {/* TODO: we need to gernalize this*/}
        <Link href={`/nachhilfe-suchen/angebot/${offer.id}`}>
          <Button className="cursor-pointer">Details anzeigen</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
