import Link from "next/link"
import { useFormattedDate } from "@/hooks"
import { type Graph } from "@/types"
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
      className="w-full h-full group relative flex flex-col space-y-3 rounded-2xl border border-accent-2 p-6"
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
      <div className="flex-grow space-y-1">
        <h2 className="text-xl font-bold">{name}</h2>
        <div className="text-gray-400">{topics.toString()} ...more</div>
      </div>
      <div className="flex items-center text-sm">
        {formattedDate ? formattedDate : <Skeleton className="h-5 w-10" />}
      </div>
    </Link>
  )
}
