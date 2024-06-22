import { format } from "date-fns/fp"
import { flow } from "lodash"

import { useEnsureCurrentDayProps } from "./ensure-current-day.model"

export const getDate = (calendar: useEnsureCurrentDayProps["calendar"]) => {
  return calendar.$app.datePickerState.selectedDate.value
}

export const setDate = (calendar: useEnsureCurrentDayProps["calendar"], date: string) => {
  return calendar.$app.datePickerState.selectedDate.value = date
}

export const getFormatUserDate = () =>
  flow(
    () => new Date(),
    format("yyyy-MM-dd"),
  )()

export const getFormatCalendarDate = (calendar: useEnsureCurrentDayProps["calendar"]) =>
  flow(
    () => getDate(calendar),
    (d) => new Date(d),
    format("yyyy-MM-dd"),
  )()
