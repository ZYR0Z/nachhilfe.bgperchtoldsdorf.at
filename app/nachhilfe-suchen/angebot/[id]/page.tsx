// similiar to the /nachhilfe-anbieten/angebot/[id] page this needs to load all the data from the db and render a niceer detailed offer page whith all the data from the db

import { getOfferById } from "@/actions/offerActions";
import { notFound } from "next/navigation";
import DetailGrid from "./detail-grid";
type Params = Promise<{ id: string }>;

export default async function FindTutoring({ params }: { params: Params }) {
  const { id } = await params;
  const id_num = Number(id);
  if (isNaN(id_num)) {
    notFound();
  }

  const offer = await getOfferById(id_num);

  if (!offer) {
    notFound();
  }

  return <DetailGrid offer={offer} />;
}
