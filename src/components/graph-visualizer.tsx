import { useEffect, useRef, useState } from "react"
import { type Graph } from "@/types"
import * as d3 from "d3"
import { ChevronRight } from "lucide-react"

import { Learn } from "./learn"
import { Button } from "./ui/button"

interface GraphVisualizerProps extends React.HTMLAttributes<SVGSVGElement> {
  adjacencyDict: any
  graph: Graph["data"]
}

export function GraphVisualizer({
  adjacencyDict,
  graph,
  ...props
}: GraphVisualizerProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [currentTopic, setCurrentTopic] = useState("")
  const d3Container = useRef<SVGSVGElement>(null)

  const getDescription = (name: string) => {
    const topic = graph.topic_list.find((item) => item.topic === name)
    return topic ? topic.description : "Topic not found."
  }

  useEffect(() => {
    if (d3Container.current && adjacencyDict) {
      const svg = d3.select(d3Container.current)
      svg.select("g").selectAll("*").remove() // Clear the graph

      const containerWidth = d3Container.current.clientWidth
      const containerHeight = d3Container.current.clientHeight

      const center = {
        x: containerWidth / 2,
        y: containerHeight / 2,
      }

      const deselectAllNodes = (event: any) => {
        if (event.target.tagName === "svg") {
          node.select("circle").attr("fill", "#222")
          nodes.forEach((n: any) => (n.selected = false))
        }
      }

      const selectNode = function (this: any, event: any, d: any) {
        const selected = !d.selected

        // Deselect all nodes
        node.select("circle").attr("fill", "#222")
        nodes.forEach((n: any) => (n.selected = false))

        if (selected) {
          // Select the clicked node
          setCurrentTopic(d.name)
          d.selected = true
          d3.select(this).select("circle").attr("fill", "#f81ce5")

          // Change the color of connected nodes
          links.forEach((link) => {
            if (link.source === d || link.target === d) {
              const otherNode = link.source === d ? link.target : link.source
              const otherNodeColor = "#eb367f"
              d3.select(`[data-id='${otherNode.id}]'`)
                .select("circle")
                .attr("fill", otherNodeColor)
            }
          })
        }
      }

      const zoomed = (event: any) => {
        g.attr("transform", event.transform)
      }

      const zoom = d3.zoom().scaleExtent([0.1, 8]).on("zoom", zoomed)
      svg.call(zoom as any)

      const g = svg.append("g")

      const nodes = Object.keys(adjacencyDict).map((key) => ({
        id: key,
        name: key,
      }))

      const links = nodes.flatMap((node) =>
        adjacencyDict[node.id].map((targetId: number) => ({
          source: node.id,
          target: targetId,
        }))
      )

      const simulation = d3
        .forceSimulation(nodes as any)
        .force(
          "link",
          d3
            .forceLink(links)
            .id((d: any) => d.id)
            .distance(100)
        )
        .force("charge", d3.forceManyBody().strength(-1000))
        .force("center", d3.forceCenter(center.x, center.y))
        .force("collide", d3.forceCollide(60))

      const link = g
        .selectAll(".link")
        .data(links)
        .enter()
        .append("line")
        .attr("class", "link")
        .attr("stroke", "#555")
        .attr("stroke-width", 2)

      const node = g
        .selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .on("click", selectNode)
        .attr("data-id", (d) => d.id)

      node.append("circle").attr("r", 30).attr("fill", "#222")

      node
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .style("fill", "white")
        .each(function (d) {
          const words = d.name.split(/\s+/)
          const len = words.length

          // Adjust the font size based on the number of words
          const fontSize = Math.min(30 / len, 8)
          d3.select(this).style("font-size", `${fontSize}px`)

          // Create a <tspan> element for each word
          for (let i = 0; i < len; i++) {
            d3.select(this)
              .append("tspan")
              .attr("x", 0)
              .attr("y", i * fontSize - ((len - 1) * fontSize) / 2)
              .text(words[i])
          }
        })

      simulation.on("tick", () => {
        link
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y)

        node.attr("transform", (d: any) => `translate(${d.x},${d.y})`)
      })
      svg.on("click", deselectAllNodes)
    } else {
      if (d3Container.current) {
        const svg = d3.select(d3Container.current)
        svg.select("g").selectAll("*").remove() // Clear the graph
      }
    }
  }, [adjacencyDict])

  return (
    <>
      <div className="relative w-full h-full">
        <svg ref={d3Container} width="100%" height="100%" {...props} />
        <div className="flex items-center justify-between gap-3 absolute bottom-0 p-4 w-full border rounded-b-lg bg-background">
          {graph && currentTopic && getDescription(currentTopic)}
          {!currentTopic && "Click on a node to learn more."}
          <Button
            variant="outline"
            className="flex items-center justify-between"
            onClick={() => setModalOpen(true)}
          >
            Learn <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <Learn
        open={!!currentTopic && modalOpen}
        setOpen={setModalOpen}
        name={currentTopic}
      />
    </>
  )
}
