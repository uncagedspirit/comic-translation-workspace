import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { saveUser } from '@/lib/appwrite-server'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false

      try {
        await saveUser({
          name: user.name ?? '',
          email: user.email,
          image: user.image ?? '',
        })
      } catch (err) {
        console.error('[Auth] Failed to save user to Appwrite:', err)
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