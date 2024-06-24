import { Calendar, createCalendar } from ".."

const defaultCalendar: Calendar = {
  colorName: "default",
  lightColors: {
    main: "#f9d71c",
    container: "#fff5aa",
    onContainer: "#594800",
  },
}

export const addDefaultCalendar = async () => {
  return await createCalendar(defaultCalendar)
}
