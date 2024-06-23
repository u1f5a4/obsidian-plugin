import { ScheduleXCalendar } from "@schedule-x/react"
import { CalendarEvent } from "@schedule-x/shared"
import "@schedule-x/theme-default/dist/index.css"
import { useEffect } from "react"
import { useRxData } from "rxdb-hooks"

import { sanitizeEvent } from "@/entities/event"
import { useEnsureCurrentDay } from "@/features/ensure-current-day"
import { useScrollToTimeIndicator } from "@/features/scroll-to-time-indicator"

import { mainCalendar } from "./calendar"

export const MainCalendar = () => {
  useScrollToTimeIndicator("main-page")
  useEnsureCurrentDay({ calendar: mainCalendar })

  const { result: events, isFetching } = useRxData<CalendarEvent>(
    "events",
    collection => collection.find(),
  )

  useEffect(() => {
    if (!events) return

    mainCalendar.events.set(events.map(sanitizeEvent))
  }, [events])

  if (isFetching) return "loading..."

  return <ScheduleXCalendar calendarApp={mainCalendar} />
}
