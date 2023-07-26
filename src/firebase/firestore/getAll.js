import { collection, getDocs, getFirestore, query } from "firebase/firestore"

import firebase_app from "../config"

const db = getFirestore(firebase_app)

export default async function getAll() {
  const q = query(collection(db, "topics"))

  let result = null
  let error = null

  try {
    result = await getDocs(q)
  } catch (e) {
    error = e
  }

  return { result, error }
}
