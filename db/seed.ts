
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { subjectsTable } from './schema';

async function main() {
    const db = drizzle();

    // TODO: what subjects do we need?
    const subjects: (typeof subjectsTable.$inferInsert)[] = [
        { name: "Mathematik" },
        { name: "Deutsch" },
        { name: "Englisch" },
        { name: "Französisch" },
        { name: "Spanisch" },
        { name: "Italienisch" },
        { name: "Latein" },
        { name: "Physik" },
        { name: "Chemie" },
        { name: "Biologie" },
        { name: "Informatik" },
    ]

    await db.insert(subjectsTable).values(subjects).onConflictDoNothing();
}

main();

