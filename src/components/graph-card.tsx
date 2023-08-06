import { GraphVisualizer } from "./graph-visualizer"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"

interface GraphDisplayCardProps {
  adjacencyDict: { [key: string]: string[] } | null
  graph: any
}

export function GraphDisplayCard({
  adjacencyDict,
  graph,
}: GraphDisplayCardProps) {
  return (
    <Card className="w-full h-screen">
      <CardHeader>
        <CardTitle>Topics Graph</CardTitle>
        <CardDescription>
          Here are some related topics post generation.
        </CardDescription>
      </CardHeader>
      <CardContent style={{ height: "calc(100% - 90px)" }}>
        <div className="w-full h-full">
          <GraphVisualizer adjacencyDict={adjacencyDict} graph={graph} />
        </div>
      </CardContent>
    </Card>
  )
}
