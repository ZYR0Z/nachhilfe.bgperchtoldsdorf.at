import NextAuth from "next-auth"
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id"

async function getAdditionalInfo(accessToken: string): Promise<{ department: string, id: string }> {
  const res = await fetch("https://graph.microsoft.com/v1.0/me?$select=id,department", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const { id, department } = await res.json();
  return { id, department };
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID!,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET!,
      issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER!,
    })
  ],
  callbacks: {
    // NOTE: used for middleware
    authorized: async ({ auth }) => {
      return !!auth
    },
    async jwt({ token, account }) {
      if (account?.access_token) {
        const additionalInfo = await getAdditionalInfo(account.access_token);
        token.department = additionalInfo.department
        token.id = additionalInfo.id
      }
      return token;
    },

    async session({ session, token }) {
      session.user.department = token.department;
      session.user.id = token.id;
      return session;
    },
  }
})
