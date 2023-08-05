import { type Timestamp } from "firebase/firestore"

export type Topic = {
  connected_topics: {
    topic: string
  }[]
  description: string
  topic: string
}

export type Graph = {
  id: string
  data: {
    name: string
    created_at: Timestamp
    topic_list: Topic[]
    user_id: string
  }
}

export type GraphInput = {
  name: string
  created_at: Timestamp
  topic_list: any
  user_id: string
}
