"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Graph } from "@/types"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import GraphVisualizer from "@/components/graph-visualizer"

export default function Home() {
  const [graph, setGraph] = useState<Graph>()
  const router = useRouter()

  useEffect(() => {
    const getDemoGraph = () => {
      const graph = {
        name: "human anatomy",
        topic_list: [
          {
            connected_topics: [
              {
                topic: "Skeletal System",
              },
              {
                topic: "Muscular System",
              },
              {
                topic: "Nervous System",
              },
              {
                topic: "Circulatory System",
              },
              {
                topic: "Respiratory System",
              },
              {
                topic: "Digestive System",
              },
              {
                topic: "Endocrine System",
              },
              {
                topic: "Reproductive System",
              },
              {
                topic: "Urinary System",
              },
              {
                topic: "Integumentary System",
              },
            ],
            topic: "Human Anatomy",
            description:
              "The study of the structure and organization of the human body.",
          },
          {
            connected_topics: [
              {
                topic: "Human Anatomy",
              },
            ],
            topic: "Skeletal System",
            description:
              "The framework of bones and cartilage that supports the body and protects internal organs.",
          },
          {
            connected_topics: [
              {
                topic: "Human Anatomy",
              },
            ],
            topic: "Muscular System",
            description:
              "The system of muscles that enables movement and provides structure and support.",
          },
          {
            connected_topics: [
              {
                topic: "Human Anatomy",
              },
            ],
            topic: "Nervous System",
            description:
              "The complex network of nerves and cells that transmit signals between different parts of the body.",
          },
          {
            connected_topics: [
              {
                topic: "Human Anatomy",
              },
            ],
            topic: "Circulatory System",
            description:
              "The system of blood vessels that delivers oxygen, nutrients, and hormones to cells and removes waste products.",
          },
          {
            connected_topics: [
              {
                topic: "Human Anatomy",
              },
            ],
            topic: "Respiratory System",
            description:
              "The organs involved in breathing, including the lungs, airways, and diaphragm.",
          },
          {
            connected_topics: [
              {
                topic: "Human Anatomy",
              },
            ],
            topic: "Digestive System",
            description:
              "The organs involved in the breakdown and absorption of food, including the stomach, intestines, and liver.",
          },
          {
            connected_topics: [
              {
                topic: "Human Anatomy",
              },
            ],
            topic: "Endocrine System",
            description:
              "The glands that produce and secrete hormones, which regulate various bodily functions.",
          },
          {
            connected_topics: [
              {
                topic: "Human Anatomy",
              },
            ],
            topic: "Reproductive System",
            description:
              "The organs involved in sexual reproduction, including the male and female reproductive organs.",
          },
          {
            connected_topics: [
              {
                topic: "Human Anatomy",
              },
            ],
            topic: "Urinary System",
            description:
              "The organs involved in the formation and excretion of urine, including the kidneys, bladder, and urethra.",
          },
          {
            connected_topics: [
              {
                topic: "Human Anatomy",
              },
            ],
            topic: "Integumentary System",
            description:
              "The skin and its associated structures, such as hair, nails, and sweat glands.",
          },
        ],
      }

      const adjacency_dict: { [key: string]: string[] } = {}

      for (const topic of graph.topic_list) {
        const connected_topics =
          topic.connected_topics?.map(
            (outputTopic: any) => outputTopic.topic
          ) || []
        adjacency_dict[topic.topic] = connected_topics
      }

      setGraph(adjacency_dict as any)
    }
    getDemoGraph()
  }, [])

  return (
    <div className="m-6 lg:container">
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
              onClick={() => router.push("/login")}
            >
              Start Improving <ArrowRight />
            </Button>
          </div>
          <GraphVisualizer
            adjacencyDict={graph}
            className="lg:w-1/2 border rounded-lg border-gray-500"
          />
        </div>
      </motion.div>
    </div>
  )
}
