import { ScheduleXCalendar } from "@schedule-x/react"
import "@schedule-x/theme-default/dist/index.css"
import { useEffect } from "react"
import { useRxData } from "rxdb-hooks"

import { CalendarEvent, sanitizeEvent } from "@/entities/event"
import { useEnsureCurrentDay } from "@/features/ensure-current-day"
import { useScrollToTimeIndicator } from "@/features/scroll-to-time-indicator"

import "./style.scss"
import { useGetRemoteCalendarsEvents } from "@/features/get-remote-calendars-events"

type MainCalendarProps = {
  calendar: any
}

export const MainCalendar = ({ calendar }: MainCalendarProps) => {
  useScrollToTimeIndicator({ container: "main-page", delayMinutes: 60 })
  useEnsureCurrentDay({ calendar })
  const [remoteEvents] = useGetRemoteCalendarsEvents()

  const { result: events, isFetching } = useRxData<CalendarEvent>(
    "events",
    collection => collection.find(),
  )

  useEffect(() => {
    if (!events || !remoteEvents) return

    const formatedEvents = [...events, ...remoteEvents].map(sanitizeEvent)
    calendar.events.set(formatedEvents)
  }, [events, remoteEvents])

  if (isFetching) return "loading..."

  return (
    <div className="main-page">
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}
