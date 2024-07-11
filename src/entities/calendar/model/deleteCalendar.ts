import { Calendar, getCollectionCalendars } from ".."

export async function deleteCalendar(calendarId: Calendar["colorName"]) {
  const collection = getCollectionCalendars()

  const findEntity = await collection.findOne({ selector: { colorName: calendarId } }).exec()
  return await findEntity?.remove()
}
