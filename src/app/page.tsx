"use client"

import { useState } from "react"
import { auth } from "@/firebase/config"
import { addData } from "@/firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { v4 as uuid } from "uuid"

import { AppInputCard } from "@/components/AppInputCard"
import { SuggestionDisplayCard } from "@/components/SuggestionDisplayCard"
import { SignIn } from "@/components/sign-in"

interface Topic {
  topic: string
  connected_topics?: Topic[]
}

interface SuggestionResponse {
  topic_list: Topic[]
}

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth)
  const [archSuggestion, setArchSuggestion] = useState<{
    [key: string]: string[]
  } | null>(null)
  const [preLoader, setPreLoader] = useState(false)

  const handleSubmit = async (input_text: string) => {
    setPreLoader(true)
    setArchSuggestion(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/get_graph`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({ input_text }),
      })

      const data: SuggestionResponse = JSON.parse(await response.json())
      console.log(data)
      await addData("topics", uuid(), {
        name: input_text,
        user_id: user?.uid,
        ...data,
      })

      // Creating adjacency dictionary from the fetched data
      const adjacency_dict: { [key: string]: string[] } = {}

      for (const topic of data.topic_list) {
        const connected_topics =
          topic.connected_topics?.map((outputTopic) => outputTopic.topic) || []
        adjacency_dict[topic.topic] = connected_topics
      }
      setArchSuggestion(adjacency_dict)
    } catch (error) {
      console.error("Error fetching architecture suggestion:", error)
    } finally {
      setPreLoader(false)
    }
  }

  return user ? (
    <div className="max-w-4xl m-auto space-y-6">
      <AppInputCard loading={preLoader} onSubmit={handleSubmit} />
      <SuggestionDisplayCard archSuggestion={archSuggestion} />
    </div>
  ) : (
    <SignIn />
  )
}

export default Dashboard
