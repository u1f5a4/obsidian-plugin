import { CalendarEntity, getCollectionCalendars } from ".."

export async function findOneById(calendarId: CalendarEntity["id"]) {
  const collection = getCollectionCalendars()

  return await collection.findOne({ selector: { id: calendarId } }).exec()
}
