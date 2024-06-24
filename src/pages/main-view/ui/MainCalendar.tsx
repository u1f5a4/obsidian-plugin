import { ScheduleXCalendar } from "@schedule-x/react"
import "@schedule-x/theme-default/dist/index.css"
import { useEffect } from "react"
import { useRxData } from "rxdb-hooks"

import { CalendarEvent, sanitizeEvent } from "@/entities/event"
import { useEnsureCurrentDay } from "@/features/ensure-current-day"
import { useScrollToTimeIndicator } from "@/features/scroll-to-time-indicator"

import "./style.scss"

type MainCalendarProps = {
  calendar: any
}

export const MainCalendar = ({ calendar }: MainCalendarProps) => {
  useScrollToTimeIndicator({ container: "main-page", delayMinutes: 60 })
  useEnsureCurrentDay({ calendar })

  const { result: events, isFetching } = useRxData<CalendarEvent>(
    "events",
    collection => collection.find(),
  )

  useEffect(() => {
    if (!events) return

    const formatedEvents = events.map(sanitizeEvent)
    calendar.events.set(formatedEvents)
  }, [events])

  if (isFetching) return "loading..."

  return (
    <div className="main-page">
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}
