import { NextResponse } from "next/server"

export const runtime = "edge"

export async function POST(req: Request) {
  const { input_text } = await req.json()

  try {
    const response = await fetch(`${process.env.HOST}/get_graph`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ input_text }),
    })

    const data = await response.json()

    return new NextResponse(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "s-maxage=300, stale-while-revalidate",
      },
      status: 200,
      statusText: "OK",
    })
  } catch (error) {
    console.error("Error fetching architecture suggestion:", error)
    return new Response("error fetching architecture suggestion", {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "s-maxage=300, stale-while-revalidate",
      },
      status: 200,
      statusText: "OK",
    })
  }
}
