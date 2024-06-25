import { Calendar, getCollectionCalendars } from ".."

export type CalendarFormattedStructure = Record<string, Pick<Calendar, "colorName" | "lightColors">>

export async function getFormatAllCalendars(): Promise<CalendarFormattedStructure> {
  const collection = getCollectionCalendars()

  const all = await collection.find({}).exec()

  const calendars: CalendarFormattedStructure = {}

  all?.forEach(calendar => {
    calendars[calendar.colorName] = {
      colorName: calendar.colorName,
      lightColors: { ...calendar.lightColors },
    }
  })

  return calendars
}
