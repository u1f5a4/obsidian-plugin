import { ScheduleXCalendar } from "@schedule-x/react"
import "@schedule-x/theme-default/dist/index.css"
import { useEffect, useMemo } from "react"

import { sanitizeEvent } from "@/entities/event"
import { useEnsureCurrentDay } from "@/features/ensure-current-day"
import { useScrollToTimeIndicator } from "@/features/scroll-to-time-indicator"

import { useGetCurrentDayEvent } from "@/features/sidebar-get-current-day-event"

import "./style.scss"

type SidebarCalendarProps = {
  calendar: any
}

export const SidebarCalendar = ({ calendar }: SidebarCalendarProps) => {
  const currentDate = useEnsureCurrentDay({ calendar: calendar, checkEveryMinutes: 1 })
  useScrollToTimeIndicator({ container: "sidebar", delayMinutes: 5, delayInit: 1000 })

  const [events, isFetching] = useGetCurrentDayEvent({ currentDate })

  useEffect(() => {
    if (!events) return

    const formatedEvents = events.map(sanitizeEvent)
    calendar.events.set(formatedEvents)
  }, [events])

  if (isFetching) return "loading..."

  return (
    <div className="sidebar">
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}
