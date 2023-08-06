import Link from "next/link"
import { motion } from "framer-motion"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function ProcessTabs() {
  return (
    <Tabs defaultValue="generate" className="w-full lg:w-1/2 m-auto space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="generate">Generate</TabsTrigger>
        <TabsTrigger value="save">Save</TabsTrigger>
        <TabsTrigger value="interact">Interact</TabsTrigger>
      </TabsList>
      <TabsContent value="generate" className="my-4 space-y-3">
        <p className="text-gray-500 text-center">
          Go to{" "}
          <Link
            href="/generate"
            className="font-bold bg-gradient-to-r from-pink-800 to-pink-400 text-transparent bg-clip-text animate-gradient"
          >
            /generate
          </Link>
          , enter the topic you wan't to learn more about and get a graph of all
          connected topics.
        </p>
        <video
          className="m-auto w-full h-full rounded-md"
          autoPlay
          controls
          muted
        >
          <source src="/generate.mp4" type="video/mp4" />
        </video>
      </TabsContent>
      <TabsContent value="save" className="my-4 space-y-3">
        <p className="text-gray-500 text-center">
          Each graph gets saved in the{" "}
          <Link
            href="/dashboard"
            className="font-bold bg-gradient-to-r from-pink-800 to-pink-400 text-transparent bg-clip-text animate-gradient"
          >
            /dashboard
          </Link>{" "}
          page where you can browse through all the previous graphs you have
          generated.
        </p>
        <video
          className="m-auto w-full h-full rounded-md"
          autoPlay
          controls
          muted
        >
          <source src="/save.mp4" type="video/mp4" />
        </video>
      </TabsContent>
      <TabsContent value="interact" className="my-4 space-y-3">
        <p className="text-gray-500 text-center">
          Remember that each item in the graph is a unique chat powered by
          ChatGPT where you can ask any questions related to the topic.
        </p>
        <video
          className="m-auto w-full h-full rounded-md"
          autoPlay
          controls
          muted
        >
          <source src="/save.mp4" type="video/mp4" />
        </video>
      </TabsContent>
    </Tabs>
  )
}

export const HowThisWorks = () => {
  return (
    <motion.div
      className="h-screen flex flex-col"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
    >
      <div className="m-auto space-y-6">
        <h1 className="text-center text-4xl lg:text-5xl font-extrabold">
          How does{" "}
          <span className="bg-gradient-to-r from-blue-700 to-blue-400 text-transparent bg-clip-text animate-gradient">
            Qal.AI
          </span>{" "}
          work?
        </h1>
        <ProcessTabs />
      </div>
    </motion.div>
  )
}
