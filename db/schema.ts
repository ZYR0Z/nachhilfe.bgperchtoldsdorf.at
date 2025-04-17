import {
    check,
    integer,
    jsonb,
    pgTable,
    timestamp,
    varchar
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const tutoringOffersTable = pgTable(
    "tutoring_offers",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        // Only one subject per tutoring offer
        // TODO: maybe only one offer per subject per tutor?
        subject_id: integer()
            .notNull()
            .references(() => subjectsTable.id),
        // Only one tutor per tutoring offer
        tutor_id: varchar({ length: 255 }).notNull(),

        // TODO: maybe own table for this?
        grades: integer().array().notNull(),
        description: varchar({ length: 511 }).notNull(),

        // TODO: find a better way to go about this
        prices: jsonb("prices")
            .notNull()
            .$type<{ duration: number; price: number }[]>(),

        // NOTE: maybe add map support and we store the coordinates?
        teaching_place: varchar({ length: 255 }),
        // TODO: find a better way to go about this (correlated with prices?)
        timeslots: jsonb("timeslots")
            .notNull()
            .$type<{ day: string; startTime: string; endTime: string }[]>(),
        createdAt: timestamp().notNull().defaultNow(),
        // TODO: set the correct timezone
        updatedAt: timestamp({ withTimezone: true })
            .notNull()
            .defaultNow()
            .$onUpdate(() => new Date())
    },
    (table) => [
        // INFO: check if the grades are in the range of 1-8
        check("grades_in_range", sql`${table.grades} <@ ARRAY[1,2,3,4,5,6,7,8]`)
    ]
);

// export const tutorsTable = pgTable("tutors", {
//   // Will be provided from ldap auth service
//   id: varchar({ length: 255 }).primaryKey(), // needs to be unique (LDAP: user_id)
//   name: varchar({ length: 255 }).notNull(),
//   email: varchar({ length: 255 }).notNull().unique(),
//   // WARNING: user_class != grade -> grades are without class delimiters (e.g. "7D" -> "7")
//   user_class: varchar({ length: 255 }).notNull(),
//   // TODO: maybe the images are local?
//   // maybe we dont even get the from ldap? just from moodle => then we wont do this
//   profile_picture: text(),
//   // TODO: sync the tutors infos with the ldap auth service (especially for the user_class)
//   createdAt: timestamp().notNull().defaultNow(),
//   updatedAt: timestamp().notNull().defaultNow().$onUpdate(() => new Date()),
// });

export const subjectsTable = pgTable("subjects", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull().unique()
});

export const tutoringOfferRelations = relations(
    tutoringOffersTable,
    ({ one }) => ({
        subject: one(subjectsTable, {
            fields: [tutoringOffersTable.subject_id],
            references: [subjectsTable.id]
        })
        // tutor: one(tutorsTable, {
        //   fields: [tutoringOffersTable.tutor_id],
        //   references: [tutorsTable.id],
        // }),
    })
);

export const subjectsRelations = relations(subjectsTable, ({ many }) => ({
    tutoringOffers: many(tutoringOffersTable)
}));

// export const tutorsRelations = relations(tutorsTable, ({ many }) => ({
//   tutoringOffers: many(tutoringOffersTable),
// }));

