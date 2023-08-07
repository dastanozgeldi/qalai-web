import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Chat } from "@/components/chat"

interface LearnProps {
  open: boolean
  setOpen: any
  name: string
}

export const Learn = ({ open, setOpen, name }: LearnProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chatting with: {name}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Chat topicName={name} />
      </DialogContent>
    </Dialog>
  )
}
