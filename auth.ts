import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    callbacks: {
        // NOTE: used for middleware
        authorized: async ({ auth }) => {
            return !!auth
        },
    },
})
