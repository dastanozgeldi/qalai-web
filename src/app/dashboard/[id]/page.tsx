"use client"

import React from "react"
import { getData } from "@/firebase/firestore"

import { GraphVisualizer } from "@/components/graph-visualizer"

interface ViewGraphProps {
  params: {
    id: string
  }
}

type Graph = {
  name: string
  topic_list: any[]
}

export default function ViewGraph({ params }: ViewGraphProps) {
  const [graph, setGraph] = React.useState<Graph>()

  React.useEffect(() => {
    const getGraph = async () => {
      const { result } = await getData("topics", params.id)
      const graph = result?.data()

      if (!graph) return

      const adjacency_dict: { [key: string]: string[] } = {}

      for (const topic of graph.topic_list) {
        const connected_topics =
          topic.connected_topics?.map(
            (outputTopic: any) => outputTopic.topic
          ) || []
        adjacency_dict[topic.topic] = connected_topics
      }
      setGraph(adjacency_dict as any)
    }
    getGraph()
  }, [])

  return (
    graph && (
      <GraphVisualizer adjacencyDict={graph} className="w-full h-screen" />
    )
  )
}
