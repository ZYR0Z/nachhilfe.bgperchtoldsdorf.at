// Mock data for the application
// This file can be easily removed when implementing real functionality

// Mock subjects
export const mockSubjects = [
    { id: 1, name: "Mathematik" },
    { id: 2, name: "Deutsch" },
    { id: 3, name: "Englisch" },
    { id: 4, name: "Physik" },
    { id: 5, name: "Chemie" },
    { id: 6, name: "Biologie" },
    { id: 7, name: "Geschichte" },
    { id: 8, name: "Geographie" },
    { id: 9, name: "Informatik" },
    { id: 10, name: "Französisch" },
    { id: 11, name: "Spanisch" },
    { id: 12, name: "Kunst" },
    { id: 13, name: "Musik" },
]

// Mock user
// infer the type
export type User = {
    id: string
    name: string
    email: string
    user_class: string
    profile_picture: string | null
}
export const mockUser: User = {
    id: "user1",
    name: "Max Mustermann",
    email: "max@example.com",
    user_class: "10A",
    profile_picture: null,
}

// Mock tutoring offers
export const mockTutoringOffers = [
    {
        id: 1,
        subject: { id: 1, name: "Mathematik" },
        tutor: {
            id: "user1",
            name: "Max Mustermann",
            email: "max@example.com",
            user_class: "10A",
            profile_picture: null,
        },
        grades: [5, 6, 7],
        description:
            "Ich biete Nachhilfe in Mathematik für die Mittelstufe an. Besonders gut kann ich Algebra und Geometrie erklären.",
        prices: [
            { duration: 60, price: 15 },
            { duration: 90, price: 20 },
        ],
        teaching_place: "Online & Vor Ort",
        timeslots: [
            { day: "Montag", startTime: "16:00", endTime: "18:00" },
            { day: "Mittwoch", startTime: "15:00", endTime: "17:00" },
        ],
    },
    {
        id: 2,
        subject: { id: 2, name: "Deutsch" },
        tutor: {
            id: "user2",
            name: "Anna Schmidt",
            email: "anna@example.com",
            user_class: "11B",
            profile_picture: null,
        },
        grades: [5, 6, 7, 8],
        description:
            "Ich helfe dir gerne bei Textanalysen, Aufsätzen und Grammatik. Gemeinsam verbessern wir deine Deutschkenntnisse.",
        prices: [
            { duration: 60, price: 12 },
            { duration: 90, price: 18 },
        ],
        teaching_place: "Online",
        timeslots: [
            { day: "Dienstag", startTime: "16:00", endTime: "19:00" },
            { day: "Freitag", startTime: "14:00", endTime: "16:00" },
        ],
    },
    {
        id: 3,
        subject: { id: 3, name: "Englisch" },
        tutor: {
            id: "user3",
            name: "Tim Müller",
            email: "tim@example.com",
            user_class: "12C",
            profile_picture: null,
        },
        grades: [5, 6, 7, 8],
        description:
            "Englisch-Nachhilfe mit Fokus auf Konversation und Grammatik. Ich habe ein Jahr in England verbracht und kann dir helfen, deine Sprachkenntnisse zu verbessern.",
        prices: [
            { duration: 60, price: 14 },
            { duration: 90, price: 20 },
        ],
        teaching_place: "Vor Ort",
        timeslots: [
            { day: "Montag", startTime: "15:00", endTime: "18:00" },
            { day: "Donnerstag", startTime: "16:00", endTime: "19:00" },
        ],
    },
    {
        id: 4,
        subject: { id: 4, name: "Physik" },
        tutor: {
            id: "user4",
            name: "Laura Weber",
            email: "laura@example.com",
            user_class: "12A",
            profile_picture: null,
        },
        grades: [7, 8],
        description:
            "Physik verständlich erklärt! Ich helfe dir, die Grundkonzepte zu verstehen und Aufgaben selbstständig zu lösen.",
        prices: [
            { duration: 60, price: 15 },
            { duration: 90, price: 22 },
        ],
        teaching_place: "Online & Vor Ort",
        timeslots: [
            { day: "Dienstag", startTime: "17:00", endTime: "19:00" },
            { day: "Samstag", startTime: "10:00", endTime: "12:00" },
        ],
    },
    {
        id: 5,
        subject: { id: 5, name: "Chemie" },
        tutor: {
            id: "user5",
            name: "Felix Bauer",
            email: "felix@example.com",
            user_class: "11C",
            profile_picture: null,
        },
        grades: [6, 7, 8],
        description:
            "Chemie ist mein Lieblingsfach! Ich erkläre dir gerne die Grundlagen und helfe dir bei der Vorbereitung auf Klassenarbeiten.",
        prices: [{ duration: 60, price: 16 }],
        teaching_place: "Online",
        timeslots: [
            { day: "Mittwoch", startTime: "16:30", endTime: "18:30" },
            { day: "Freitag", startTime: "15:00", endTime: "17:00" },
        ],
    },
]

// Mock user tutoring offers
export const mockUserTutoringOffers = [
    {
        id: 1,
        subject: { id: 1, name: "Mathematik" },
        grades: [5, 6, 7],
        description:
            "Ich biete Nachhilfe in Mathematik für die Mittelstufe an. Besonders gut kann ich Algebra und Geometrie erklären.",
        prices: [
            { duration: 60, price: 15 },
            { duration: 90, price: 20 },
        ],
        teaching_place: "Online & Vor Ort",
        timeslots: [
            { day: "Montag", startTime: "16:00", endTime: "18:00" },
            { day: "Mittwoch", startTime: "15:00", endTime: "17:00" },
        ],
    },
    {
        id: 3,
        subject: { id: 3, name: "Englisch" },
        grades: [5, 6, 7, 8],
        description:
            "Englisch-Nachhilfe mit Fokus auf Konversation und Grammatik. Ich kann dir helfen, deine Sprachkenntnisse zu verbessern.",
        prices: [
            { duration: 60, price: 14 },
            { duration: 90, price: 20 },
        ],
        teaching_place: "Vor Ort",
        timeslots: [
            { day: "Montag", startTime: "15:00", endTime: "18:00" },
            { day: "Donnerstag", startTime: "16:00", endTime: "19:00" },
        ],
    },
]

// Mock offer details for editing
export const getMockOfferForEditing = (id: string) => {
    return {
        id: Number.parseInt(id),
        subject_id: id === "1" ? 1 : 3,
        grades: id === "1" ? [5, 6, 7] : [5, 6, 7, 8],
        description:
            id === "1"
                ? "Ich biete Nachhilfe in Mathematik für die Mittelstufe an. Besonders gut kann ich Algebra und Geometrie erklären."
                : "Englisch-Nachhilfe mit Fokus auf Konversation und Grammatik. Ich kann dir helfen, deine Sprachkenntnisse zu verbessern.",
        prices:
            id === "1"
                ? [
                    { duration: 60, price: 15 },
                    { duration: 90, price: 20 },
                ]
                : [
                    { duration: 60, price: 14 },
                    { duration: 90, price: 20 },
                ],
        teaching_place: id === "1" ? "Online & Vor Ort" : "Vor Ort",
        timeslots:
            id === "1"
                ? [
                    { day: "Montag", startTime: "16:00", endTime: "18:00" },
                    { day: "Mittwoch", startTime: "15:00", endTime: "17:00" },
                ]
                : [
                    { day: "Montag", startTime: "15:00", endTime: "18:00" },
                    { day: "Donnerstag", startTime: "16:00", endTime: "19:00" },
                ],
    }
}

// Mock offer details
export const getMockOfferDetails = (id: string) => {
    const baseOffer = mockTutoringOffers.find((offer) => offer.id === Number.parseInt(id))

    if (!baseOffer) {
        return mockTutoringOffers[0]
    }

    return {
        ...baseOffer,
        description: baseOffer.description + " " + baseOffer.description, // Make it longer for the detail view
    }
}

