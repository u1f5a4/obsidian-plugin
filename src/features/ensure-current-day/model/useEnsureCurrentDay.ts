import { useEffect, useRef, useState } from "react"

import { getDate, getFormatCalendarDate, getFormatUserDate, setDate } from ".."

export type useEnsureCurrentDayProps = {
  calendar: any // CalendarApp
  checkEveryMinutes?: number
}

export const useEnsureCurrentDay = ({ calendar, checkEveryMinutes = 1 }: useEnsureCurrentDayProps) => {
  const isInitialMount = useRef(true)
  const [currentDate, setCurrentDate] = useState<string>(getDate(calendar))

  // start watch date
  useEffect(() => {
    const interval = setInterval(() => {
      const userDate = getFormatUserDate()
      const calendarDate = getFormatCalendarDate(calendar)

      if (userDate !== calendarDate) setCurrentDate(userDate)
    }, checkEveryMinutes * 1000 * 60)

    return () => clearInterval(interval)
  }, [])

  // if current date changed
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    setDate(calendar, currentDate)
  }, [currentDate])

  return currentDate
}
