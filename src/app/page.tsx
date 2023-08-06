"use client"

import { useEffect, useState } from "react"
import { Graph } from "@/types"

import { Pricing } from "@/components/pricing"

import { Hero } from "./hero"
import { HowThisWorks } from "./how-this-works"

export default function Home() {
  const [graph, setGraph] = useState<Graph>()

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
    <div className="m-6 lg:container space-y-24">
      <Hero graph={graph} />
      <HowThisWorks />
      <Pricing />
    </div>
  )
}
