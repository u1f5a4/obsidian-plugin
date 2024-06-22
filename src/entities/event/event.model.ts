import { RxJsonSchema } from "rxdb"

export interface CalendarEvent {
  id: string | number
  start: string
  end: string
  title?: string
  people?: string[]
  location?: string
  description?: string
  calendarId?: string
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
    location: { type: "string" },
    people: { type: "array", items: { type: "string" } },
    description: { type: "string" },
    calendarId: { type: "string" },
  },
  required: ["id", "start", "end"],
}

export function sanitizeEvent(event: CalendarEvent): CalendarEvent {
  return {
    id: event.id,
    start: event.start,
    end: event.end,
    title: event.title,
    people: event.people,
    location: event.location,
    description: event.description,
    calendarId: event.calendarId,
  }
}
