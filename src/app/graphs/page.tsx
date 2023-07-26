"use client"

import React from "react"
import { getAll } from "@/firebase/firestore"

export default function MyGraphs() {
  const [graphs, setGraphs] = React.useState<any[]>([])

  React.useEffect(() => {
    const getGraphs = async () => {
      const graphsArr: any[] = []
      const { result } = await getAll()
      result?.forEach((doc) => {
        graphsArr.push(doc.data())
      })
      setGraphs(graphsArr)
    }
    getGraphs()
  }, [])

  return (
    <div className="max-w-4xl mx-auto my-4">
      <h1 className="text-3xl font-extrabold">My Graphs</h1>
      <div className="space-y-6 my-4">
        {graphs.map((graph: any) => (
          <div className="p-6 border border-gray-600 rounded-lg">
            <h1>{graph.name}</h1>
          </div>
        ))}
      </div>
    </div>
  )
}
