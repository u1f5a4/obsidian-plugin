import { ScheduleXCalendar } from "@schedule-x/react";
import { CalendarEvent } from "@schedule-x/shared";
import "@schedule-x/theme-default/dist/index.css";
import { endOfDay, format, startOfDay } from "date-fns";
import { useEffect } from "react";
import { useRxData } from "rxdb-hooks";

import { sanitizeEvent } from "@/entities/event";

import { sidebarCalendar } from "./calendar";

const today = new Date();
const startOfToday = format(startOfDay(today), "yyyy-MM-dd HH:mm");
const endOfToday = format(endOfDay(today), "yyyy-MM-dd HH:mm");

export const SidebarCalendar = () => {
  const { result: events, isFetching } = useRxData<CalendarEvent>(
    "events",
    collection =>
      collection.find({
        selector: {
          $or: [
            { start: { $gte: startOfToday, $lt: endOfToday } },
            { end: { $gte: startOfToday, $lt: endOfToday } },
            { start: { $lte: endOfToday }, end: { $gte: startOfToday } },
          ],
        },
      }),
  );

  useEffect(() => {
    if (!events) return;

    sidebarCalendar.events.set(events.map(sanitizeEvent));
  }, [events]);

  if (isFetching) return "loading...";

  return <ScheduleXCalendar calendarApp={sidebarCalendar} />;
};
