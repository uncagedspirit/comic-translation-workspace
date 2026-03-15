import { Client, TablesDB, ID, Query } from 'node-appwrite'

function getClient(): Client {
  return new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT ?? 'https://cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_PROJECT_ID ?? '')
    .setKey(process.env.APPWRITE_API_KEY ?? '')
}

const DB_ID = process.env.APPWRITE_DATABASE_ID ?? ''
const USERS_TABLE = process.env.APPWRITE_USERS_COLLECTION_ID ?? ''
const FEEDBACK_TABLE = process.env.APPWRITE_FEEDBACK_COLLECTION_ID ?? ''

export async function saveUser(user: {
  name: string
  email: string
  image: string
}) {
  if (!DB_ID || !USERS_TABLE) {
    throw new Error('Missing Appwrite env vars for users table')
  }

  const db = new TablesDB(getClient())

  const existing = await db.listRows({
    databaseId: DB_ID,
    tableId: USERS_TABLE,
    queries: [Query.equal('email', [user.email])],
  })

  if (existing.rows.length === 0) {
    await db.createRow({
      databaseId: DB_ID,
      tableId: USERS_TABLE,
      rowId: ID.unique(),
      data: {
        name: user.name,
        email: user.email,
        image: user.image,
      },
    })
    console.log('[Auth] New user saved to Appwrite:', user.email)
  } else {
    console.log('[Auth] User already exists in Appwrite:', user.email)
  }
}

export async function saveFeedback(data: {
  name: string
  email: string
  message: string
  rating: number
}) {
  if (!DB_ID || !FEEDBACK_TABLE) {
    throw new Error('Missing Appwrite env vars for feedback table')
  }

  const db = new TablesDB(getClient())

  return db.createRow({
    databaseId: DB_ID,
    tableId: FEEDBACK_TABLE,
    rowId: ID.unique(),
    data: {
      name: data.name,
      email: data.email,
      message: data.message,
      rating: data.rating,
    },
  })
}