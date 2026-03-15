import { Client, Databases, ID, Query } from 'node-appwrite'

function getClient(): Client {
  return new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT ?? 'https://cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_PROJECT_ID ?? '')
    .setKey(process.env.APPWRITE_API_KEY ?? '')
}

const DB_ID = process.env.APPWRITE_DATABASE_ID ?? ''
const USERS_COL = process.env.APPWRITE_USERS_COLLECTION_ID ?? ''
const FEEDBACK_COL = process.env.APPWRITE_FEEDBACK_COLLECTION_ID ?? ''

export async function saveUser(user: {
  name: string
  email: string
  image: string
}) {
  if (!DB_ID || !USERS_COL) return

  const db = new Databases(getClient())

  const existing = await db.listDocuments(DB_ID, USERS_COL, [
    Query.equal('email', [user.email]),
  ])

  if (existing.documents.length === 0) {
    await db.createDocument(DB_ID, USERS_COL, ID.unique(), {
      name: user.name,
      email: user.email,
      image: user.image,
      createdAt: new Date().toISOString(),
    })
  }
}

export async function saveFeedback(data: {
  name: string
  email: string
  message: string
  rating: number
}) {
  if (!DB_ID || !FEEDBACK_COL) {
    throw new Error('Appwrite environment variables not configured')
  }

  const db = new Databases(getClient())

  return db.createDocument(DB_ID, FEEDBACK_COL, ID.unique(), {
    name: data.name,
    email: data.email,
    message: data.message,
    rating: data.rating,
    createdAt: new Date().toISOString(),
  })
}