import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const { saveUser } = await import('./appwrite-server')
        await saveUser({
          name: user.name ?? '',
          email: user.email ?? '',
          image: user.image ?? '',
        })
      } catch (err) {
        // Don't block sign in on Appwrite errors — log and continue
        console.error('[Auth] Failed to persist user to Appwrite:', err)
      }
      return true
    },
    async session({ session }) {
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
    error: '/',
  },
}