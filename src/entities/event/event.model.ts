import { RxDocument, RxJsonSchema } from "rxdb"

import { CalendarEntity } from "../calendar"

export interface CalendarEvent {
  id: string
  title: string
  start: string
  end: string
  calendarId: CalendarEntity["id"]

  people?: string[]
  location?: string
  description?: string
}

export const eventSchema: RxJsonSchema<CalendarEvent> = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: { type: "string", maxLength: 32 },
    title: { type: "string" },
    start: { type: "string" },
    end: { type: "string" },
    calendarId: { type: "string" },

    location: { type: "string" },
    people: { type: "array", items: { type: "string" } },
    description: { type: "string" },
  },
  required: ["id", "start", "end", "title", "calendarId"],
}

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
