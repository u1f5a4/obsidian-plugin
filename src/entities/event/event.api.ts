import { randomUUID } from "crypto"
import { RxCollection } from "rxdb"

import { database } from "@/app/model/rxdb"

import { CalendarEvent } from "./event.model"

export async function createEvent(entity: Omit<CalendarEvent, "id">) {
  const collection = database.getCollection("events")

  return await collection?.insert({
    id: randomUUID(),
    ...entity,
  })
}

export async function updateEvent(eventId: CalendarEvent["id"], newData: Partial<Omit<CalendarEvent, "id">>) {
  const collection: RxCollection<CalendarEvent> = database.getCollection("events")

  const event = await collection.findOne({ selector: { id: eventId } }).exec()

  const changeOldData = (oldData: CalendarEvent): CalendarEvent => {
    const keysNewData = Object.keys(newData) as Array<keyof CalendarEvent>

    keysNewData.forEach((key) => {
      if (key === "id") return
      if (newData[key] === undefined) return

      // TODO: fix type
      // @ts-ignore
      oldData[key] = newData[key]
    })
    return oldData
  }

  await event?.modify(changeOldData)
}

export async function deleteEvent(eventId: CalendarEvent["id"]) {
  const collection: RxCollection<CalendarEvent> = database.getCollection("events")

  const event = await collection.findOne({ selector: { id: eventId } }).exec()
  await event?.remove()
}
