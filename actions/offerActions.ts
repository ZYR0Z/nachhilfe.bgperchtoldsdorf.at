"use server"
import { tutoringOffersTable } from "@/db/schema";
import { unstable_cache } from 'next/cache'
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { InferResultType } from "@/lib/utils";

export type TutoringOffer = InferResultType<'tutoringOffersTable', { subject: true, tutor: true }>

// TODO: do we want to let typescript infer the type of the offer or do want to strongly type it?
// export const getAllOffers = async () => {
//   const data = await db.query.tutoringOffersTable.findMany({
//     with: {
//       tutor: true,
//       subject: true,
//     }
//   })
//   return data
// }


export const getAllOffers = unstable_cache(
  async () => {
    return await db.query.tutoringOffersTable.findMany({
      with: {
        tutor: true,
        subject: true,
      }
    })
  },
  ['offers']
)

export const getOfferById = unstable_cache(
  async (id: number) => {
    return await db.query.tutoringOffersTable.findFirst({
      where: (tutoringOffersTable, { eq }) => eq(tutoringOffersTable.id, id),
      with: {
        tutor: true,
        subject: true,
      }
    });
  },
  // TODO: we need to make this dynamic
  [`offer:byID`]
);

export const getOffersByTutorId = unstable_cache(
  async (tutorId: string) => {
    return await db.query.tutoringOffersTable.findMany({
      where: (tutoringOffersTable, { eq }) => eq(tutoringOffersTable.tutor_id, tutorId),
      with: {
        tutor: true,
        subject: true,
      }
    })
  },
  // TODO: we need to make this dynamic
  [`offer:byTutorId`]
)

export const getOffersBySubjectId = async (subjectId: number) => {
  return await db.query.tutoringOffersTable.findMany({
    where: (tutoringOffersTable, { eq }) => eq(tutoringOffersTable.subject_id, subjectId),
    with: {
      tutor: true,
      subject: true,
    }
  })
}

// TODO: maybe add offer by grade?? but how do we do this with multiple grades?

// TODO: do we want to have it return the created offer?
export const createOffer = async (offer: typeof tutoringOffersTable.$inferInsert) => {
  await db.insert(tutoringOffersTable).values(offer)
}

export const editOffer = async (id: number, offer: typeof tutoringOffersTable.$inferInsert) => {
  await db.update(tutoringOffersTable)
    .set(offer)
    .where(eq(tutoringOffersTable.id, id))
  // TODO: do we even need this?
  revalidatePath("/angebote/meine-angebote")
  revalidateTag(`offers`)
  // TODO: we need to make this dynamic
  revalidateTag(`offer:byID`)
}

// TODO: cascading delete on subject & tutor deletion?
export const deleteOffer = async (id: number) => {
  await db.delete(tutoringOffersTable)
    .where(eq(tutoringOffersTable.id, id))
  // TODO: do we even need this?
  revalidatePath("/angebote/meine-angebote")
  revalidateTag(`offers`)
  // TODO: we need to make this dynamic
  revalidateTag(`offer:byID`)
}



