import { RxDocument } from "rxdb"

import { CalendarEvent } from ".."

export function sanitizeEvent(event: RxDocument<CalendarEvent> | CalendarEvent): CalendarEvent {
  const clearEvent: CalendarEvent = {
    id: event.id,
    start: event.start,
    end: event.end,
    title: event.title,
    calendarId: event.calendarId,
  }

  if (event?.people?.length) clearEvent.people = event.people
  if (event?.location) clearEvent.location = event.location
  if (event?.description) clearEvent.description = event.description

  return clearEvent
}
