import { RxCollection } from "rxdb"

import { database } from "@/app/rxdb"

import { CalendarEvent } from ".."

export async function deleteEvent(eventId: CalendarEvent["id"]) {
  const collection: RxCollection<CalendarEvent> = database.getCollection("events")

  const event = await collection.findOne({ selector: { id: eventId } }).exec()
  return await event?.remove()
}
