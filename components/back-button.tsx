"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <p
      className="text-sm text-muted-foreground mb-4 flex items-center cursor-pointer"
      onClick={() => router.back()}
    >
      <ArrowLeft className="w-4 h-4 mr-2" /> Zurück zur Übersicht
    </p>
  );
}
