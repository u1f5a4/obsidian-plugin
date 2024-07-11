import { format } from "date-fns"
import { fromZonedTime } from "date-fns-tz"
import { findIana } from "windows-iana"
// @ts-ignore
import ICAL from "ical.js"
import { flow } from "lodash"

import { RemoteEvent } from ".."

export function convertRemoteCalendarEvents(events: any): Pick<RemoteEvent, "title" | "start" | "end">[] {
  return events.map((event: any) => {
    const vevent = new ICAL.Event(event)

    const tzid = event.getFirstProperty("dtstart").getParameter("tzid") //  return "Russia Time Zone 3"

    // TODO: may come in IANA or Windows format
    const timezone = findIana(tzid)[0]

    const title = vevent.summary

    const start = flow(
      (string) => fromZonedTime(string, timezone),
      (date) => format(date, "yyyy-MM-dd HH:mm"),
    )(vevent.startDate.toString())

    const end = flow(
      (string) => fromZonedTime(string, timezone),
      (date) => format(date, "yyyy-MM-dd HH:mm"),
    )(vevent.endDate.toString())

    return { title, start, end }
  })
}
