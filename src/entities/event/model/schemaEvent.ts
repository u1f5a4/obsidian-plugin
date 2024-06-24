import { RxJsonSchema } from "rxdb"

import { Calendar } from "@/entities/calendar"

export interface CalendarEvent {
  id: string
  title: string
  start: string
  end: string
  calendarId: Calendar["id"]

  people?: string[]
  location?: string
  description?: string
}

export const schemaEvent: RxJsonSchema<CalendarEvent> = {
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