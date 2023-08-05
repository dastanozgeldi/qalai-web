"use client"

import React from "react"
import { auth } from "@/firebase/config"
import { getUserTopics } from "@/firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"

import { GraphItem } from "./graph-item"

export default function MyGraphs() {
  const [graphs, setGraphs] = React.useState<any[] | null>([])
  const [user] = useAuthState(auth)

  React.useEffect(() => {
    const getGraphs = async (uid: string) => {
      const { data } = await getUserTopics(uid)
      setGraphs(data)
    }
    if (user) getGraphs(user.uid)
  }, [])

  return (
    <div className="max-w-4xl mx-auto my-4 p-6">
      <h1 className="text-3xl font-extrabold">My Graphs</h1>
      {graphs && graphs.length > 0 ? (
        <div className="my-4 gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center justify-items-center">
          {graphs.map((graph: any) => (
            <GraphItem key={graph.id} graph={graph} />
          ))}
        </div>
      ) : (
        <p className="text-xl">You have no graphs yet.</p>
      )}
    </div>
  )
}
