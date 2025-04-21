import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import Link from "next/link";

export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="text-sm text-muted-foreground mb-4 flex items-center">
        <Link
          href="/suchen"
          className="text-sm text-muted-foreground flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Zurück zur Übersicht
        </Link>
      </div>

      <Skeleton className="h-7 w-42 rounded-lg mb-4" />

      <div className="grid gap-8 grid-cols-1 md:grid-cols-3 h-[430px]">
        <Skeleton className="col-span-2 rounded-xl h-full" />
        <div className="relative h-full flex gap-8 flex-col">
          <Card>
            <CardHeader>
              <CardTitle>Kontakt</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full mb-4">
                Direkt eine Anfrage senden
              </Button>
              <Button className="w-full" variant="outline">
                Per E-Mail kontaktieren
              </Button>
            </CardContent>
          </Card>

          <Skeleton className="h-full rounded-xl"></Skeleton>
        </div>
      </div>
    </div>
  );
}
