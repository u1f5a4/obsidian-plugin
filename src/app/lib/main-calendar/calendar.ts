import { createCalendar, viewMonthGrid, viewWeek } from "@schedule-x/calendar"
import { createCurrentTimePlugin } from "@schedule-x/current-time"
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop"
import { createResizePlugin } from "@schedule-x/resize"

import MainCalendarPlugin from "./custom-plugin"

export const mainCalendar = createCalendar({
  plugins: [
    createDragAndDropPlugin(),
    createResizePlugin(),
    createCurrentTimePlugin({ fullWeekWidth: true }),
    new MainCalendarPlugin(),
  ],
  defaultView: viewWeek.name,
  views: [viewWeek, viewMonthGrid],
  events: [],
  isDark: false,
})
