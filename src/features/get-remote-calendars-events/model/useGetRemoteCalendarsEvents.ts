import { flow } from "lodash"
import { useEffect, useState } from "react"
import { useRxData } from "rxdb-hooks"

import { Calendar } from "@/entities/calendar"
import { CalendarEvent } from "@/entities/event"
import {
  convertRemoteCalendarEvents,
  createRemoteEvent,
  fetchRemoteCalendar,
  getRecurringEvents,
} from "@/entities/remote-event"

export function useGetRemoteCalendarsEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>()

  const { result: calendarsWithURL, isFetching } = useRxData<Calendar>(
    "calendars",
    collection =>
      collection.find({
        selector: {
          url: { $exists: true },
        },
      }),
  )

  useEffect(() => {
    ;(async () => {
      if (isFetching) return

      const first = calendarsWithURL[0]
      const colorName = first.toJSON().colorName
      const url = first.toJSON().url

      const result = await flow(
        async (url) => await fetchRemoteCalendar(url),
        async (events) => getRecurringEvents(await events, { months: 2 }),
        async (events) => convertRemoteCalendarEvents(await events),
        async (events) =>
          Promise.all((await events).map(event => createRemoteEvent({ ...event, calendarId: colorName }))),
      )(url)

      setEvents(result)
    })()
  }, [isFetching])

  return [events]
}
