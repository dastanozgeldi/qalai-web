import { useEffect, useState } from "react"
import dayjs from "dayjs"

export const useFormattedDate = (date: string | Date, format?: string) => {
  const [formattedDate, setFormattedDate] = useState("")

  useEffect(() => {
    setFormattedDate(dayjs(date).format(format ?? "MMMM DD, YYYY"))
  }, [date, format])

  return formattedDate
}
