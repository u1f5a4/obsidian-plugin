import { CalendarEvent as XCalendarEvent } from "@schedule-x/shared";
import { randomUUID } from "crypto";
import { RxJsonSchema } from "rxdb";

import Database from "@/modules/database";

export interface CalendarEvent extends XCalendarEvent {}

export const eventSchema: RxJsonSchema<CalendarEvent> = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 32,
    },
    title: {
      type: "string",
    },
    start: {
      type: "string",
    },
    end: {
      type: "string",
    },
    location: {
      type: "string",
    },
    people: {
      type: "array",
      items: {
        type: "string",
      },
    },
    calendarId: {
      type: "string",
    },
  },
  required: ["id", "start", "end"],
};

export async function createEvent(entity: Omit<CalendarEvent, "id">) {
  const collection = Database.getCollection("events");

  return await collection?.insert({
    id: randomUUID(),
    ...entity,
  });
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
  };
}
