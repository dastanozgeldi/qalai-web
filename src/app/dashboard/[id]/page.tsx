"use client"

import React from "react"
import { getData } from "@/firebase/firestore"
import { type Graph } from "@/types"

import { GraphVisualizer } from "@/components/graph-visualizer"

interface ViewGraphProps {
  params: {
    id: string
  }
}

export default function ViewGraph({ params }: ViewGraphProps) {
  const [graph, setGraph] = React.useState<Graph["data"]>()
  const [adjacencyDict, setAdjacencyDict] = React.useState({} as any)

  React.useEffect(() => {
    const getGraph = async () => {
      const { result } = await getData("topics", params.id)
      const graph = result?.data()

      if (!graph) return
      setGraph(graph as Graph["data"])
      const adjacency_dict: { [key: string]: string[] } = {}

      for (const topic of graph.topic_list) {
        const connected_topics =
          topic.connected_topics?.map(
            (outputTopic: any) => outputTopic.topic
          ) || []
        adjacency_dict[topic.topic] = connected_topics
      }
      setAdjacencyDict(adjacency_dict as any)
    }
    getGraph()
  }, [])

  return (
    graph && (
      <GraphVisualizer
        adjacencyDict={adjacencyDict}
        graph={graph}
        className="w-full h-[90vh]"
      />
    )
  )
}
