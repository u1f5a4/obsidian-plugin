import { createCalendar, viewDay } from "@schedule-x/calendar"
import { createCurrentTimePlugin } from "@schedule-x/current-time"
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop"
import { createResizePlugin } from "@schedule-x/resize"

import { type CalendarFormattedStructure, getFormatAllCalendars } from "@/entities/calendar"

import SidebarCalendarPlugin from "./custom-plugin"

class SidebarCalendar {
  calendars?: CalendarFormattedStructure

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
        new SidebarCalendarPlugin(),
      ],
      defaultView: viewDay.name,
      views: [viewDay],
      events: [],
      isDark: false,
      calendars: this.calendars,
    })
  }
}

export const sidebarCalendar = new SidebarCalendar()
