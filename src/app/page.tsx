"use client"

import React, { useState } from "react"
import { addData } from "@/firebase/firestore"
import { v4 as uuid } from "uuid"

import { AppInputCard } from "@/components/AppInputCard"
import { DescriptionCard } from "@/components/DescriptionCard"
import { SuggestionDisplayCard } from "@/components/SuggestionDisplayCard"

// Define the types for data received from the API
interface Topic {
  topic: string
  connected_topics?: Topic[]
}

interface SuggestionResponse {
  topics_description: string
  topic_list: Topic[]
}

const IndexPage: React.FC = () => {
  // State variables
  const [archSuggestion, setArchSuggestion] = useState<{
    [key: string]: string[]
  } | null>(null)
  const [topicsDescription, setTopicsDescription] = useState<string>("")
  const [preLoader, setPreLoader] = useState<boolean>(false)

  // Function to fetch suggested topics from the API
  const fetchArchSuggestion = async (projectDescription: string) => {
    setPreLoader(true) // Show preloader
    setArchSuggestion(null)
    setTopicsDescription("")

    try {
      const response = await fetch("/api/arch_suggestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input_text: projectDescription }),
      })

      const data: SuggestionResponse = JSON.parse(await response.json())
      await addData("topics", uuid(), { name: projectDescription, ...data })
      setTopicsDescription(data.topics_description)

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
    <>
      <div
        style={{
          top: "100px",
          display: "grid",
          gridTemplateColumns: "3fr 400px",
          gridTemplateRows: "9fr 1fr",
          height: "100vh",
        }}
      >
        <div>
          <div
            style={{
              paddingTop: "20px",
              height: "100%",
              paddingLeft: "20px",
            }}
          >
            <SuggestionDisplayCard archSuggestion={archSuggestion} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",

            gap: "20px",
          }}
        >
          <div style={{ height: "350px" }}>
            <AppInputCard loading={preLoader} onSubmit={fetchArchSuggestion} />
          </div>

          <div style={{ minHeight: "calc(100% - 350px)" }}>
            <DescriptionCard generatedDescription={topicsDescription} />
          </div>
        </div>
      </div>
    </>
  )
}

export default IndexPage
