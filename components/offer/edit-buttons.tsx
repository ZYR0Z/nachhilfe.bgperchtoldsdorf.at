"use client";
import { Button } from "@/components/ui/button";
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
import { deleteOffer, TutoringOffer } from "@/actions/offerActions";

export default function EditButtons({ id }: { id: TutoringOffer["id"] }) {
  const handleDelete = async () => {
    await deleteOffer(id);
  };
  return (
    <div className="flex items-center gap-2 ml-auto">
      {/* TODO: make the width & height the same bc what is this??? */}
      <Link href={`/angebote/${id}/bearbeiten`}>
        <Button variant="outline" className="cursor-pointer aspect-square w-10">
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
              Dise Aktion kann nicht rückgängig gemacht werden. Wir werden das
              Angebot unwiderruflich von unseren Servern löschen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive"
              onClick={handleDelete}
            >
              Löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
