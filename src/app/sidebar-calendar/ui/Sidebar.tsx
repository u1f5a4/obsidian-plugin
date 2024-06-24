import { useMemo } from "react"

import { SidebarCalendar } from "@/pages/sidebar-view"

import { sidebarCalendar } from ".."

export const Sidebar = () => {
  const calendar = useMemo(() => sidebarCalendar.get(), [])

  return <SidebarCalendar calendar={calendar} />
}
