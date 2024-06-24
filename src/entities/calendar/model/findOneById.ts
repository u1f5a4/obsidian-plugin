import { Calendar, getCollectionCalendars } from ".."

export async function findOneById(calendarId: Calendar["colorName"]) {
  const collection = getCollectionCalendars()

  return await collection.findOne({ selector: { colorName: calendarId } }).exec()
}
