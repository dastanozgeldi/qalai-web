import GraphVisualizer from "./graph-visualizer"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"

interface GraphDisplayCardProps {
  graph: { [key: string]: string[] } | null
}

export function GraphDisplayCard({ graph }: GraphDisplayCardProps) {
  return (
    <Card className="w-full h-screen">
      <CardHeader>
        <CardTitle>Topics Graph</CardTitle>
        <CardDescription>Here are some related topics post generation.</CardDescription>
      </CardHeader>
      <CardContent style={{ height: "calc(100% - 90px)" }}>
        <div className="w-full h-full">
          <GraphVisualizer adjacencyDict={graph} />
        </div>
      </CardContent>
    </Card>
  )
}
