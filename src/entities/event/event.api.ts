import { randomUUID } from "crypto";
import { RxCollection } from "rxdb";

import Database from "@/modules/database";
import { CalendarEvent } from "./event.model";

export async function createEvent(entity: Omit<CalendarEvent, "id">) {
  const collection = Database.getCollection("events");

  return await collection?.insert({
    id: randomUUID(),
    ...entity,
  });
}

export async function updateEvent(eventId: string, newData: Partial<CalendarEvent>) {
  const collection: RxCollection<CalendarEvent> = Database.getCollection("events");

  const event = await collection.findOne({ selector: { id: eventId } }).exec();

  const changeOldData = (oldData: CalendarEvent): CalendarEvent => {
    const keysNewData = Object.keys(newData) as Array<keyof CalendarEvent>;

    keysNewData.forEach((key) => {
      if (newData[key] === undefined) return;

      // TODO: add validation
      // @ts-ignore
      oldData[key] = newData[key];
    });
    return oldData;
  };

  await event?.modify(changeOldData);
}

export async function deleteEvent(eventId: string) {
  const collection: RxCollection<CalendarEvent> = Database.getCollection("events");

  const event = await collection.findOne({ selector: { id: eventId } }).exec();
  await event?.remove();
}
