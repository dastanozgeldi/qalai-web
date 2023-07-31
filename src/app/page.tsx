"use client"

import { useState } from "react"
import { addData } from "@/firebase/firestore"
import { v4 as uuid } from "uuid"

import { AppInputCard } from "@/components/AppInputCard"
import { SuggestionDisplayCard } from "@/components/SuggestionDisplayCard"

interface Topic {
  topic: string
  connected_topics?: Topic[]
}

interface SuggestionResponse {
  topic_list: Topic[]
}

const Dashboard = () => {
  // State variables
  const [archSuggestion, setArchSuggestion] = useState<{
    [key: string]: string[]
  } | null>(null)
  const [preLoader, setPreLoader] = useState<boolean>(false)

  // Function to fetch suggested topics from the API
  const fetchArchSuggestion = async (projectDescription: string) => {
    setPreLoader(true) // Show preloader
    setArchSuggestion(null)

    try {
      const response = await fetch("/api/graph", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input_text: projectDescription }),
      })

      const data: SuggestionResponse = JSON.parse(await response.json())
      await addData("topics", uuid(), { name: projectDescription, ...data })

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
      setPreLoader(false) // Hide preloader
    }
  }

  return (
    <div className="max-w-4xl m-auto space-y-6">
      <AppInputCard loading={preLoader} onSubmit={fetchArchSuggestion} />
      <SuggestionDisplayCard archSuggestion={archSuggestion} />
    </div>
  )
}

export default Dashboard
