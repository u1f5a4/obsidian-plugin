import { Calendar, getCollectionCalendars } from ".."

export async function getFormatAllCalendars(): Promise<Record<string, Calendar>> {
  const collection = getCollectionCalendars()

  const all = await collection.find({}).exec()

  const calendars: Record<string, Calendar> = {}

  all?.forEach(calendar => {
    calendars[calendar.colorName] = {
      colorName: calendar.colorName,
      lightColors: { ...calendar.lightColors },
    }
  })

  return calendars
}
