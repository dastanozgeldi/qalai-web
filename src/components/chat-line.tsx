import { Bot, User } from "lucide-react"

import { cn } from "@/lib/utils"

type ChatGPTAgent = "user" | "system" | "assistant"

export interface ChatGPTMessage {
  role: ChatGPTAgent
  content: string
}

// loading placeholder animation for the chat line
export const LoadingChatLine = () => (
  <div className="flex min-w-full animate-pulse px-4 py-5 sm:px-6">
    <div className="flex flex-grow space-x-3">
      <div className="min-w-0 flex-1">
        <p className="font-large text-xxl text-foreground">
          <a href="#" className="hover:underline">
            AI
          </a>
        </p>
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-zinc-500"></div>
            <div className="col-span-1 h-2 rounded bg-zinc-500"></div>
          </div>
          <div className="h-2 rounded bg-zinc-500"></div>
        </div>
      </div>
    </div>
  </div>
)

// util helper to convert new lines to <br /> tags
const convertNewLines = (text: string) =>
  text.split("\n").map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ))

export function ChatLine({ role = "assistant", content }: ChatGPTMessage) {
  if (!content) {
    return null
  }
  const formattedMessage = convertNewLines(content)

  return (
    <div
      className={
        role != "assistant" ? "float-right clear-both" : "float-left clear-both"
      }
    >
      <div className="float-right mb-5 rounded-lg bg-background px-4 py-5 shadow-lg border border-gray-500 sm:px-6">
        <div className="flex space-x-3">
          <div className="flex-1 gap-4">
            <p className="font-bold text-foreground">
              {role == "assistant" ? (
                <div className="flex items-center gap-2">
                  AI <Bot width={16} height={16} />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  You <User width={16} height={16} />
                </div>
              )}
            </p>
            <p
              className={cn(
                "text ",
                role == "assistant" ? "font-semibold font- " : "text-foreground"
              )}
            >
              {formattedMessage}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
