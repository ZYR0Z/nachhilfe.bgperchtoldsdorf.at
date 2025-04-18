"use server"
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { subjectsTable } from "@/db/schema";

export type Subject = typeof subjectsTable.$inferSelect;

export const getAllSubjects = async () => {
  return await db.query.subjectsTable.findMany({});
}

export const getSubjectById = async (id: number) => {
  return await db.query.subjectsTable.findFirst({
    where: (subjectsTable, { eq }) => eq(subjectsTable.id, id),
  })
};

export const deleteSubject = async (id: number) => {
  await db.delete(subjectsTable)
    .where(eq(subjectsTable.id, id))
  // TODO: maybe we need to revalidate the admin page?
}

export const createSubject = async (subject: typeof subjectsTable.$inferInsert) => {
  await db.insert(subjectsTable).values(subject)
}

export const editSubject = async (id: number, subject: typeof subjectsTable.$inferInsert) => {
  await db.update(subjectsTable).set(subject).where(eq(subjectsTable.id, id))
}
