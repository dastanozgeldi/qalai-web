import { type Graph } from "@/types"
import { collection, getDocs, query, where } from "firebase/firestore"

import { db } from "../config"

export async function getUserTopics(user_id: string) {
  const collectionRef = collection(db, "topics")
  const sortedQuery = query(collectionRef, where("user_id", "==", user_id))

  let data = null
  let error = null

  try {
    const queryShapshot = await getDocs(sortedQuery)
    data = queryShapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    })) as Graph[]

    console.log(data)
  } catch (e) {
    error = e
  }

  return { data, error }
}
