import { CalendarEntity, getCollectionCalendars } from ".."

export async function createCalendar(entity: CalendarEntity) {
  const collection = getCollectionCalendars()

  return await collection?.insert(entity)
}
