import { createCalendar, viewMonthAgenda, viewMonthGrid, viewWeek } from "@schedule-x/calendar"
import { createCurrentTimePlugin } from "@schedule-x/current-time"
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop"
import { createResizePlugin } from "@schedule-x/resize"

import { Calendar, getFormatAllCalendars } from "@/entities/calendar"

import MainCalendarPlugin from "./custom-plugin"

class MainCalendar {
  calendars?: Record<string, Calendar> = undefined

  async init() {
    this.calendars = await getFormatAllCalendars()
  }

  get() {
    if (!this.calendars) throw new Error("[Error] calendars is not defined")

    return createCalendar({
      plugins: [
        createDragAndDropPlugin(),
        createResizePlugin(),
        createCurrentTimePlugin({ fullWeekWidth: true }),
        new MainCalendarPlugin(),
      ],
      defaultView: viewWeek.name,
      views: [viewWeek, viewMonthGrid, viewMonthAgenda],
      events: [],
      isDark: false,
      calendars: this.calendars,
    })
  }
}

export const mainCalendar = new MainCalendar()
