import Link from "next/link"
import { useFormattedDate } from "@/hooks"
import { Graph } from "@/types"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"

import { Skeleton } from "@/components/ui/skeleton"

export const GraphItem = ({ graph }: { graph: Graph }) => {
  const { name, created_at, topic_list } = graph.data
  const topics = topic_list.map((topic) => topic.topic).slice(0, 3)

  const formattedDate = useFormattedDate(created_at.toDate(), "YYYY-MM-DD")

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  return (
    <Link
      key={graph.id}
      href={`/dashboard/${graph.id}`}
      className="group relative flex flex-col space-y-3 rounded-2xl border border-accent-2 p-6"
      onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect()

        mouseX.set(e.clientX - left)
        mouseY.set(e.clientY - top)
      }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 [--spotlight:rgba(0,0,0,0.05)] group-hover:opacity-100 dark:[--spotlight:rgba(255,255,255,0.15)]"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              var(--spotlight),
              transparent 80%
            )
          `,
        }}
      />
      {/* eslint-disable @next/next/no-img-element */}
      <img
        className="rounded-lg"
        width={1280}
        height={720}
        src="https://images.unsplash.com/photo-1659441891288-2628f5b3a500?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFlODZ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"
        alt={name}
      />
      <div className="flex-grow space-y-1">
        <h2 className="text-xl font-bold">{name}</h2>
        <div className="text-gray-400">{topics.toString()} ...</div>
      </div>
      <div className="flex items-center text-sm">
        {formattedDate ? formattedDate : <Skeleton className="h-5 w-10" />}
      </div>
    </Link>
  )
}
