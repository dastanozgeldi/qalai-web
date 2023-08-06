"use client"

import { useEffect, useState } from "react"
import { Graph } from "@/types"

import { Pricing } from "@/components/pricing"
import { TestimonialCard } from "@/components/testimonial-card"

import { Hero } from "./hero"
import { HowThisWorks } from "./how-this-works"

const testimonials = [
  {
    name: "Elon Musk",
    position: "CEO @ SpaceX",
    text: "This web app has saved me countless hours of research work and helped me acquire new skills much faster and more efficient.",
    image: "https://i1.sndcdn.com/avatars-XpzN0ujJa3iI96PS-hKizHQ-t500x500.jpg",
  },
  {
    name: "Mark Zuckerberg",
    position: "CEO @ Meta",
    text: "I have been using Qal.AI for a while now and I am very impressed with the results. I highly recommend it to anyone who wants to learn new things.",
    image:
      "https://people.com/thmb/aA--KsaFpaBaiFtbt3Nw4ZeKk24=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(999x0:1001x2)/mark-zuckerberg-1-2000-1123e66859e94403b843e5ae6ed368fd.jpg",
  },
]

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
    <div className="m-6 lg:container space-y-12">
      <Hero graph={graph} />
      <HowThisWorks />
      <Pricing />
      <div className="">
        <div className="text-center lg:text-left mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
          <h2 className="font-heading text-4xl leading-[1.1] lg:text-5xl font-extrabold">
            Testimonials
          </h2>
          <p className="lg:max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            The people that have supported us so far.
          </p>
        </div>
        <div className="max-w-4xl mx-auto my-10 grid grid-cols-2 items-center justify-items-center">
          {testimonials.map((testimonial) => (
            <TestimonialCard testimonial={testimonial} />
          ))}
        </div>
      </div>
    </div>
  )
}
