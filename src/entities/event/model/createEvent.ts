import { randomUUID } from "crypto"
import { RxCollection } from "rxdb"

import { database } from "@/app/rxdb"

import { CalendarEvent } from ".."

export async function createEvent(entity: Omit<CalendarEvent, "id">) {
  const collection: RxCollection<CalendarEvent> = database.getCollection("events")

  return await collection?.insert({
    id: randomUUID(),
    ...entity,
  })
}
