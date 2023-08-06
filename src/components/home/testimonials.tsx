import { TestimonialCard } from "./testimonial-card"

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

export const Testimonials = () => {
  return (
    <>
      <div className="text-center lg:text-left mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-heading text-4xl leading-[1.1] lg:text-5xl font-extrabold">
          Testimonials
        </h2>
        <p className="lg:max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          The people that have supported us so far.
        </p>
      </div>
      <div className="max-w-4xl mx-auto my-10 gap-10 grid grid-cols-1 md:grid-cols-2 items-center justify-items-center">
        {testimonials.map((testimonial) => (
          <TestimonialCard testimonial={testimonial} />
        ))}
      </div>
    </>
  )
}
