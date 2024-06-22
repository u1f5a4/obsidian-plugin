import { createCalendar, viewDay } from "@schedule-x/calendar"
import { createCurrentTimePlugin } from "@schedule-x/current-time"
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop"
import { createResizePlugin } from "@schedule-x/resize"

import { database } from "@/app/model/rxdb"

import SidebarCalendarPlugin from "./custom-plugin"

export const sidebarCalendar = createCalendar({
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
})
