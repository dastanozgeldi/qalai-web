"use-client"

import { useState } from "react"
import { Check, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface AppInputCardProps {
  onSubmit: (projectDescription: string) => void
  loading: boolean
}

export function AppInputCard(props: AppInputCardProps) {
  const [projectDescription, setProjectDescription] = useState("")

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="font-bold">Get a graph of topics</CardTitle>
        <CardDescription>
          The graph generation process takes ~1 minute.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Textarea
                onChange={(event) => setProjectDescription(event?.target.value)}
                placeholder="Geometry basics"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        {props.loading ? (
          <Button disabled className="w-full">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button
            className="w-full"
            onClick={() => {
              props.onSubmit(projectDescription)
            }}
          >
            <Check className="mr-2 h-4 w-4" /> Get Knowledge Graph
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
