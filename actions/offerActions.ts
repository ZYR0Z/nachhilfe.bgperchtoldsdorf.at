"use server"
import { tutoringOffersTable } from "@/db/schema";
import { unstable_cache } from 'next/cache'
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { revalidateTag } from "next/cache";
import { InferResultType } from "@/lib/utils";

export type TutoringOffer = InferResultType<'tutoringOffersTable', { subject: true, tutor: true }>

export const getAllOffers = unstable_cache(
  async () => {
    return await db.query.tutoringOffersTable.findMany({
      with: {
        tutor: true,
        subject: true,
      }
    })
  },
  ['offers'],
  { tags: ['offers'] }
)

export async function getOfferById(id: number) {
  return unstable_cache(
    () => {
      return db.query.tutoringOffersTable.findFirst({
        where: (tutoringOffersTable, { eq }) => eq(tutoringOffersTable.id, id),
        with: {
          tutor: true,
          subject: true,
        }
      });
    },
    ["offer", id.toString()],
    { tags: ["offer", `offer:id:${id}`] }
  )();
}

export async function getOffersByTutorId(tutorId: string) {
  return unstable_cache(
    () => {
      return db.query.tutoringOffersTable.findMany({
        where: (tutoringOffersTable, { eq }) => eq(tutoringOffersTable.tutor_id, tutorId),
        with: {
          tutor: true,
          subject: true,
        }
      })
    },
    ["offer", tutorId],
    { tags: ["offer", `offer:tutor:${tutorId}`, `tutor:${tutorId}`] }
  )()
}

export async function getOffersBySubjectId(subjectId: number) {
  return unstable_cache(
    () => {
      return db.query.tutoringOffersTable.findMany({
        where: (tutoringOffersTable, { eq }) => eq(tutoringOffersTable.subject_id, subjectId),
        with: {
          tutor: true,
          subject: true,
        }
      })
    },
    ["offer", subjectId.toString()],
    { tags: ["offer", `offer:subject:${subjectId}`, `subject:${subjectId}`] }
  )
}

// TODO: maybe add offer by grade?? but how do we do this with multiple grades?
export const createOffer = async (offer: typeof tutoringOffersTable.$inferInsert) => {
  await db.insert(tutoringOffersTable).values(offer)
  revalidateTag('offers')
  revalidateTag(`offer:tutor:${offer.tutor_id}`)
}

export const editOffer = async (id: number, offer: typeof tutoringOffersTable.$inferInsert) => {
  await db.update(tutoringOffersTable)
    .set(offer)
    .where(eq(tutoringOffersTable.id, id))
  revalidateTag(`offers`)
  revalidateTag(`offer:id:${id}`)
}

// TODO: cascading delete on subject & tutor deletion?
export const deleteOffer = async (id: number) => {
  const offer = await db.delete(tutoringOffersTable)
    .where(eq(tutoringOffersTable.id, id)).returning()
  revalidateTag(`offers`)
  revalidateTag(`offer:tutor:${offer[0].tutor_id}`)
  revalidateTag(`offer:id:${id}`)
}



