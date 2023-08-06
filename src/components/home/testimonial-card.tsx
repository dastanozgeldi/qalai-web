import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface TestimonialCardProps {
  testimonial: {
    name: string
    position: string
    text: string
    image: string
  }
}

export const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <img
          className="w-[100px] h-[100px] rounded-full object-cover m-auto"
          src={testimonial.image}
          alt={testimonial.image}
        />
      </CardHeader>
      <CardContent>
        <p>&ldquo;{testimonial.text}&rdquo;</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <h3 className="font-bold">{testimonial.name}</h3>
        <p>{testimonial.position}</p>
      </CardFooter>
    </Card>
  )
}
