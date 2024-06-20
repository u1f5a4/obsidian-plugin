import { createCalendar, viewMonthGrid, viewWeek } from "@schedule-x/calendar";
import { createCalendarControlsPlugin } from "@schedule-x/calendar-controls";
import { createCurrentTimePlugin } from "@schedule-x/current-time";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createResizePlugin } from "@schedule-x/resize";

import MainCalendarPlugin from "./custom-plugin";

export const calendarControls = createCalendarControlsPlugin();
export const eventsServicePlugin = createEventsServicePlugin();

export const mainCalendar = createCalendar({
  plugins: [
    eventsServicePlugin,
    createDragAndDropPlugin(),
    createResizePlugin(),
    createCurrentTimePlugin({ fullWeekWidth: true }),
    calendarControls,
    new MainCalendarPlugin(),
  ],
  defaultView: viewWeek.name,
  views: [viewWeek, viewMonthGrid],
  events: [],
});
