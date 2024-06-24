import { useMemo } from "react"

import { MainCalendar } from "@/pages/main-view"

import { mainCalendar } from ".."

export const Main = () => {
  const calendar = useMemo(() => mainCalendar.get(), [])

  return <MainCalendar calendar={calendar} />
}
