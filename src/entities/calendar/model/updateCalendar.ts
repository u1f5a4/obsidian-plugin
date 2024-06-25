import { Calendar, getCollectionCalendars } from ".."

export async function updateCalendar(colorName: Calendar["colorName"], entity: Partial<Calendar>) {
  const collection = getCollectionCalendars()

  const findCalendar = await collection.findOne({ selector: { colorName: colorName } }).exec()
  if (!findCalendar) return

  return await findCalendar?.patch({ ...entity, colorName })
}
