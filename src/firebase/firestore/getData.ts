import { doc, getDoc } from "firebase/firestore"

import { db } from "../config"

export async function getData(collection: string, id: string) {
  let docRef = doc(db, collection, id)

  let result = null
  let error = null

  try {
    result = await getDoc(docRef)
  } catch (e) {
    error = e
  }

  return { result, error }
}
