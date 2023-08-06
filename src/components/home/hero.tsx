"use client"

import { useRouter } from "next/navigation"
import { auth } from "@/firebase/config"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useAuthState } from "react-firebase-hooks/auth"

import { Button } from "@/components/ui/button"

import { GraphDemo } from "./graph-demo"

export const Hero = () => {
  const router = useRouter()
  const [user, loading] = useAuthState(auth)

  return (
    <motion.div
      className="h-screen lg:h-[80vh] flex flex-col"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
    >
      <div className="flex flex-col lg:flex-row h-full items-center justify-between gap-6">
        <div className="lg:w-1/2 space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl lg:text-5xl font-extrabold">
              Where education meets{" "}
              <span className="bg-gradient-to-r from-blue-700 to-blue-400 text-transparent bg-clip-text animate-gradient">
                generative AI.
              </span>
            </h1>
            <h2 className="text-xl text-secondary-foreground">
              Qal.AI is an innovative web app that enhances learning by
              generating graphs for your topic.
            </h2>
          </div>
          <Button
            className="flex items-center gap-2 text-lg"
            size="lg"
            onClick={() => {
              if (!loading && user) {
                return router.push("/generate")
              }
              return router.push("/login")
            }}
          >
            Start Improving <ArrowRight />
          </Button>
        </div>
        <GraphDemo />
      </div>
    </motion.div>
  )
}
