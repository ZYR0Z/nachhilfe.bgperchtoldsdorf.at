
import 'dotenv/config';
import { subjectsTable } from './schema';
import { db } from '.';

async function main() {

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

