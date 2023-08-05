"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

import { Icons } from "./icons"

type Groups = {
  name: string
  actions: {
    title: string
    icon: React.ReactNode
    onSelect: () => void
  }[]
}[]

export const CommandMenu = () => {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const { setTheme } = useTheme()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  const groups: Groups = [
    {
      name: "General",
      actions: [
        {
          title: "Home",
          icon: <Icons.home size={16} className="mr-2" />,
          onSelect: () => runCommand(() => router.push("/")),
        },
        {
          title: "Dashboard",
          icon: <Icons.dashboard size={16} className="mr-2" />,
          onSelect: () => runCommand(() => router.push("/dashboard")),
        },
        {
          title: "Source Code",
          icon: <Icons.code size={16} className="mr-2" />,
          onSelect: () =>
            runCommand(() =>
              window.open(
                "https://github.com/dastanozgeldi/qalai-web",
                "_blank"
              )
            ),
        },
      ],
    },
    {
      name: "Theme",
      actions: [
        {
          title: "Light",
          icon: <Icons.sun size={16} className="mr-2" />,
          onSelect: () => runCommand(() => setTheme("light")),
        },
        {
          title: "Dark",
          icon: <Icons.moon size={16} className="mr-2" />,
          onSelect: () => runCommand(() => setTheme("dark")),
        },
      ],
    },
    {
      name: "Social",
      actions: [
        {
          title: "GitHub",
          icon: <Icons.github size={16} className="mr-2" />,
          onSelect: () =>
            runCommand(() =>
              window.open("https://github.com/dastanozgeldi/", "_blank")
            ),
        },
        {
          title: "Instagram",
          icon: <Icons.instagram size={16} className="mr-2" />,
          onSelect: () =>
            runCommand(() =>
              window.open("https://instagram.com/dastanozgeldi/", "_blank")
            ),
        },
        {
          title: "LinkedIn",
          icon: <Icons.linkedin size={16} className="mr-2" />,
          onSelect: () =>
            runCommand(() =>
              window.open("https://linkedin.com/in/dastanozgeldi/", "_blank")
            ),
        },
      ],
    },
  ]

  return (
    <>
      <Button
        variant="ghost"
        className="flex h-9 w-9 items-center justify-center p-0"
        onClick={() => setOpen(true)}
        type="button"
        aria-label="Open Command Menu"
        title="Open Command Menu"
      >
        <Icons.command size={20} />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {groups.map((group, i) => (
            <React.Fragment key={group.name}>
              <CommandGroup heading={group.name}>
                {group.actions.map((action) => (
                  <CommandItem key={action.title} onSelect={action.onSelect}>
                    {action.icon}
                    {action.title}
                  </CommandItem>
                ))}
              </CommandGroup>
              {i !== groups.length - 1 && <CommandSeparator />}
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}
