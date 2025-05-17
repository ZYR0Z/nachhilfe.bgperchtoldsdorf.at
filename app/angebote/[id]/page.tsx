import { Clock, TriangleAlert } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getOfferById } from "@/actions/offerActions";
import { createInitials } from "@/lib/utils";
import { auth } from "@/auth";
import EditButtons from "@/components/offer/edit-buttons";

import { notFound } from "next/navigation";
import Link from "next/link";
import BackButton from "@/components/back-button";

type Params = Promise<{ id: string }>;

export default async function Page({ params }: { params: Params }) {
  const id = Number((await params).id);
  if (isNaN(id)) notFound();

  const offer = (await getOfferById(id)) ?? notFound();

  const session = await auth();

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <BackButton />
      <h2 className="font-bold text-xl mb-4">{offer.subject.name}</h2>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
        <Card className="col-span-2">
          <CardContent>
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Avatar>
                  <AvatarImage
                    src={offer.tutor.image || undefined}
                    alt={offer.tutor.name}
                  />
                  <AvatarFallback>
                    {createInitials(offer.tutor.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{offer.tutor.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {offer.tutor.department}
                  </p>
                </div>
                {session?.user?.id === offer.tutor.id && (
                  <EditButtons id={offer.id} />
                )}
              </div>
            </div>
            <h3 className="font-medium mb-2">Schulstufe(n):</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {offer.grades.map((grade) => (
                <Badge key={grade} className="bg-muted text-foreground">
                  {grade}
                </Badge>
              ))}
            </div>
            <h3 className="font-medium ">Beschreibung:</h3>
            <div className="flex flex-wrap gap-2 mb-4 text-muted-foreground">
              {offer.description}
            </div>
            {offer.teaching_place && (
              <>
                <h3 className="font-medium">Unterrichtsort:</h3>
                <div className="flex flex-wrap gap-2 mb-4 text-muted-foreground">
                  {offer.teaching_place}
                </div>
              </>
            )}
            <h3 className="font-medium mb-2">Unterrichtseinheiten:</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {offer.timeslots.map((slot, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 border rounded-md"
                >
                  <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>
                    {slot.day}: {slot.startTime} - {slot.endTime}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Kontakt</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full mb-4" disabled>
                Direkt eine Anfrage senden
              </Button>
              <Button className="w-full" disabled variant="outline">
                <Link href={`mailto:${offer.tutor.email}`}>
                  Per E-Mail kontaktieren
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Preise</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dauer</TableHead>
                    <TableHead>Preis</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {offer.prices.map((price, index) => (
                    <TableRow key={index}>
                      <TableCell>{price.duration} Minuten</TableCell>
                      <TableCell>{price.price}&euro;</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div>
                <p className="text-xs text-muted-foreground mt-4">
                  <TriangleAlert className="inline h-4 w-4 mr-1" />
                  Preise sind unverbindlich und können sich jederzeit ändern.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
