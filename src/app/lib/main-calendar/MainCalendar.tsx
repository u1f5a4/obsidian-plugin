import { ScheduleXCalendar } from "@schedule-x/react"
import "@schedule-x/theme-default/dist/index.css"
import { useEffect, useMemo } from "react"
import { useRxData } from "rxdb-hooks"

import { CalendarEvent, sanitizeEvent } from "@/entities/event"
import { useEnsureCurrentDay } from "@/features/ensure-current-day"
import { useScrollToTimeIndicator } from "@/features/scroll-to-time-indicator"
import { mainCalendar as calendar } from "./calendar"

export const MainCalendar = () => {
  const mainCalendar = useMemo(() => calendar.get(), [])

  useScrollToTimeIndicator("main-page")
  useEnsureCurrentDay({ calendar: mainCalendar })

  const { result: events, isFetching } = useRxData<CalendarEvent>(
    "events",
    collection => collection.find(),
  )

  useEffect(() => {
    if (!events) return

    const formatedEvents = events.map(sanitizeEvent)
    mainCalendar.events.set(formatedEvents)
  }, [events])

  if (isFetching) return "loading..."

  return <ScheduleXCalendar calendarApp={mainCalendar} />
}
