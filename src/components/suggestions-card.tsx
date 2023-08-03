import NetworkVisualizer from "./graph-visualizer"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"

interface SuggestionDisplayCardProps {
  archSuggestion: { [key: string]: string[] } | null
}

export function SuggestionDisplayCard(props: SuggestionDisplayCardProps) {
  return (
    <Card className="w-full h-screen">
      <CardHeader>
        <CardTitle>Architecture Diagram</CardTitle>
        <CardDescription>Suggested architecture diagram</CardDescription>
      </CardHeader>
      <CardContent style={{ height: "calc(100% - 90px)" }}>
        <div className="w-full h-full">
          <NetworkVisualizer adjacencyDict={props.archSuggestion} />
        </div>
      </CardContent>
    </Card>
  )
}
