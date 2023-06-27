import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const authOptions = {
  // Configure one or more authentication providers
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email:  {label: "Email", type: "text", placeholder: "Email Aqui"},
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { username, password } = credentials

        const user = await client.user.findUnique({
          where: {
            email: username
          }
        })

        if(user && user.password === password) {
          return Promise.resolve({
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          })
        } else throw new Error('Credenciais inválidas')
          
      }
    })
    // ...add more providers here
  ],
  
}

const handler = NextAuth(authOptions)

export {
  handler as GET,
  handler as POST
}