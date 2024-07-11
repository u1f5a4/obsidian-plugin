import { RxCollection } from "rxdb"

import { database } from "@/app/rxdb"

import { CalendarEvent } from ".."

export async function updateEvent(eventId: CalendarEvent["id"], entity: Partial<CalendarEvent>) {
  const collection: RxCollection<CalendarEvent> = database.getCollection("events")

  const findEvent = await collection.findOne({ selector: { id: eventId } }).exec()
  if (!findEvent) return

  return await findEvent?.patch({ ...entity, id: eventId })
}
