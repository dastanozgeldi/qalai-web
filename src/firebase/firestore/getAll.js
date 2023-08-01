import { collection, getDocs, query } from "firebase/firestore"

import { db } from "../config"

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
