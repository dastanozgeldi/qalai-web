import Link from "next/link"
import { useFormattedDate } from "@/hooks"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"

import { Skeleton } from "@/components/ui/skeleton"

interface GraphItemProps {
  graph: {
    id: string
    data: any
  }
}

export const GraphItem = ({ graph }: GraphItemProps) => {
  const formattedDate = useFormattedDate(
    graph.data.created_at.toDate(),
    "YYYY-MM-DD"
  )

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
        alt={graph.data.name}
      />
      <div className="flex-grow space-y-4">
        <h2 className="text-xl font-bold">{graph.data.name}</h2>
        <div className="text-accent-5">mamamamam</div>
      </div>
      <div className="flex items-center text-sm">
        {formattedDate ? formattedDate : <Skeleton className="h-5 w-10" />}
        &nbsp;/&nbsp; 585 likes &nbsp;/&nbsp; 1840 views
      </div>
    </Link>
  )
}
