import { collection, getDocs, query, where } from "firebase/firestore"

import { db } from "../config"

export default async function getUserTopics(user_id) {
  const q = query(collection(db, "topics"), where("user_id", "==", user_id))

  let result = null
  let error = null

  try {
    result = await getDocs(q)
  } catch (e) {
    error = e
  }

  return { result, error }
}
