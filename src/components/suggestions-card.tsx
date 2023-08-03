import GraphVisualizer from "./graph-visualizer"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"

interface GraphDisplayCardProps {
  archSuggestion: { [key: string]: string[] } | null
}

export function GraphDisplayCard({
  archSuggestion,
}: GraphDisplayCardProps) {
  return (
    <Card className="w-full h-screen">
      <CardHeader>
        <CardTitle>Architecture Diagram</CardTitle>
        <CardDescription>Suggested architecture diagram</CardDescription>
      </CardHeader>
      <CardContent style={{ height: "calc(100% - 90px)" }}>
        <div className="w-full h-full">
          <GraphVisualizer adjacencyDict={archSuggestion} />
        </div>
      </CardContent>
    </Card>
  )
}
