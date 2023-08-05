import { collection, getDocs, orderBy, query, where } from "firebase/firestore"

import { db } from "../config"

export default async function getUserTopics(user_id) {
  const collectionRef = collection(db, "topics")
  const sortedQuery = query(
    collectionRef,
    // orderBy("created_at", "desc"),
    where("user_id", "==", user_id)
  )

  let data = null
  let error = null

  try {
    const queryShapshot = await getDocs(sortedQuery)
    data = queryShapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }))

    console.log(data)
  } catch (e) {
    error = e
  }

  return { data, error }
}
