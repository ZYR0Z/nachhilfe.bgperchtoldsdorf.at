"use server"
import { db } from "@/db"
import { tutorsTable } from "@/db/schema"
import { eq } from "drizzle-orm"

export type Tutor = typeof tutorsTable.$inferSelect
export type NewTutor = typeof tutorsTable.$inferInsert

export const getTutorById = async (id: string) => {
  return await db.query.tutorsTable.findFirst({
    where: (tutorsTable, { eq }) => eq(tutorsTable.id, id),
  })
}

export const getAllTutors = async () => {
  return await db.query.tutorsTable.findMany()
}

export const createTutor = async (tutor: typeof tutorsTable.$inferInsert) => {
  // TODO: do we want this or do we want to update or a seperate function?
  await db.insert(tutorsTable).values(tutor).onConflictDoNothing()
}


export const deleteTutor = async (id: string) => {
  await db.delete(tutorsTable).where(eq(tutorsTable.id, id))
}

export const editTutor = async (id: string, tutor: typeof tutorsTable.$inferInsert) => {
  await db.update(tutorsTable).set(tutor).where(eq(tutorsTable.id, id))
}

