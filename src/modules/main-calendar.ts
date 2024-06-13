import { createCalendar, viewDay, viewMonthGrid, viewWeek } from "@schedule-x/calendar";
import { createCalendarControlsPlugin } from "@schedule-x/calendar-controls";
import { createCurrentTimePlugin } from "@schedule-x/current-time";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createResizePlugin } from "@schedule-x/resize";

import MainCalendarPlugin from "@/modules/main-calendar-plugin";

export const calendarControls = createCalendarControlsPlugin();
export const eventsServicePlugin = createEventsServicePlugin();

export const calendar = createCalendar({
  plugins: [
    eventsServicePlugin,
    createDragAndDropPlugin(),
    createResizePlugin(),
    createCurrentTimePlugin({ fullWeekWidth: true }),
    createEventModalPlugin(),
    calendarControls,
    new MainCalendarPlugin(),
  ],
  defaultView: viewWeek.name,
  views: [viewDay, viewWeek, viewMonthGrid],
  events: [],
});
