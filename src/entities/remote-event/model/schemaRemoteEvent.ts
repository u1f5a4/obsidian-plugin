import { RxJsonSchema } from "rxdb"

import { CalendarEvent } from "@/entities/event"

export interface RemoteEvent extends CalendarEvent {
}

export const schemaRemoteEvent: RxJsonSchema<RemoteEvent> = {
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
