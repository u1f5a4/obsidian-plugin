import { Calendar, getCollectionCalendars } from ".."

export type FormatCalendar = Omit<Calendar, "id"> & { colorName: string }

export async function getFormatAllCalendars(): Promise<Record<string, FormatCalendar>> {
  const collection = getCollectionCalendars()

  const all = await collection.find({}).exec()

  const calendars: Record<string, FormatCalendar> = {}

  all?.forEach(calendar => {
    calendars[calendar.id] = {
      colorName: calendar.id,
      lightColors: { ...calendar.lightColors },
    }
  })

  return calendars
}
