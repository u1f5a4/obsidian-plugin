import { CalendarEntity, createCalendar, getCollectionCalendars } from ".."

const defaultCalendar: CalendarEntity = {
  id: "default",
  lightColors: {
    main: "#f9d71c",
    container: "#fff5aa",
    onContainer: "#594800",
  },
}

export const addDefaultCalendar = async () => {
  const collectionCalendars = getCollectionCalendars()

  const isEmpty = await collectionCalendars.count().exec()

  if (isEmpty === 0) await createCalendar(defaultCalendar)
}
