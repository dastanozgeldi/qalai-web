"use client"

import React from "react"
import Link from "next/link"
import { auth } from "@/firebase/config"
import { getUserTopics } from "@/firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"

export default function MyGraphs() {
  const [graphs, setGraphs] = React.useState<any[]>([])
  const [user] = useAuthState(auth)

  React.useEffect(() => {
    const getGraphs = async (uid: string) => {
      const graphsArr: any[] = []
      const { result } = await getUserTopics(uid)
      result?.forEach((doc) => {
        graphsArr.push({ id: doc.id, data: doc.data() })
      })
      setGraphs(graphsArr)
    }
    if (user) getGraphs(user.uid)
  }, [])

  return (
    <div className="max-w-4xl mx-auto my-4 p-6">
      <h1 className="text-3xl font-extrabold">My Graphs</h1>
      <div className="space-y-6 my-4">
        {graphs.map((graph: any) => (
          <div className="p-6 border border-gray-600 rounded-lg">
            <Link href={`/dashboard/${graph.id}`}>
              <h1>{graph.data.name}</h1>
            </Link>
            <p>{graph.data.user_id}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
