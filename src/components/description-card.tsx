import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface DescriptionCardProps {
  generatedDescription: string
}

export function DescriptionCard(props: DescriptionCardProps) {
  const archDescriptionHeader =
    props.generatedDescription === ""
      ? `Run "Get Suggestion" to retrieve an architecture suggestion`
      : "AI recommended architecture:"
  return (
    <Card className="w-[350px] h-full">
      <CardHeader>
        <CardTitle>Further study recommendations</CardTitle>
        <CardDescription>{archDescriptionHeader}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-w-[350px] overflow-scroll">
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            {props.generatedDescription}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
