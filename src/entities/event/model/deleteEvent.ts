import { RxCollection } from "rxdb"

import { database } from "@/app/model/rxdb"

import { CalendarEvent } from ".."

export async function deleteEvent(eventId: CalendarEvent["id"]) {
  const collection: RxCollection<CalendarEvent> = database.getCollection("events")

  const event = await collection.findOne({ selector: { id: eventId } }).exec()
  await event?.remove()
}
