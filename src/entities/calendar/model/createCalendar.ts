import { Calendar, getCollectionCalendars } from ".."

export async function createCalendar(entity: Calendar) {
  const collection = getCollectionCalendars()

  return await collection?.insert(entity)
}
