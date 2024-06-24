import { Calendar, getCollectionCalendars } from ".."

export async function findOneById(calendarId: Calendar["id"]) {
  const collection = getCollectionCalendars()

  return await collection.findOne({ selector: { id: calendarId } }).exec()
}
