"use client"

import React from "react"
import { getData } from "@/firebase/firestore"

type Graph = {
  name: string
  topic_list: any[]
}

export default function ViewGraph({ params }: { params: { id: string } }) {
  const [graph, setGraph] = React.useState<Graph>()

  React.useEffect(() => {
    const getGraph = async () => {
      const { result } = await getData("topics", params.id)
      const graph = result?.data()
      console.log(graph)
      setGraph(graph as any)
    }
    getGraph()
  }, [])

  return (
    graph && (
      <div className="border max-w-4xl mx-auto my-4 w-full p-6 border-gray-600 rounded-lg prose dark:prose-invert">
        <h1>{graph.name}</h1>
        <div>
          <h2>Here are the related topics to revise:</h2>
          {graph.topic_list.map((topic: any) => (
            <div className="p-2 border-gray-600 rounded-lg border-y">
              <h3>{topic.topic}</h3>
              <p>{topic.description}</p>
            </div>
          ))}
        </div>
      </div>
    )
  )
}
