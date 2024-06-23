import { ScheduleXCalendar } from "@schedule-x/react";
import "@schedule-x/theme-default/dist/index.css";
import { endOfDay, format, startOfDay } from "date-fns";
import { useCallback, useEffect } from "react";
import { RxCollection } from "rxdb";
import { useRxData } from "rxdb-hooks";

import { CalendarEvent, sanitizeEvent } from "@/entities/event";
import { useEnsureCurrentDay } from "@/features/ensure-current-day";
import { useScrollToTimeIndicator } from "@/features/ScrollToTimeIndicator";

import { sidebarCalendar } from "./calendar";

const getToday = () => new Date();
const getStartOfToday = () => format(startOfDay(getToday()), "yyyy-MM-dd HH:mm");
const getEndOfToday = () => format(endOfDay(getToday()), "yyyy-MM-dd HH:mm");

export const SidebarCalendar = () => {
  const currentDate = useEnsureCurrentDay({ calendar: sidebarCalendar });
  useScrollToTimeIndicator("sidebar", 5, 500);

  const queryConstructor = useCallback<(collection: RxCollection<CalendarEvent>) => any>(
    collection =>
      collection.find({
        selector: {
          $or: [
            { start: { $gte: getStartOfToday(), $lt: getEndOfToday() } },
            { end: { $gte: getStartOfToday(), $lt: getEndOfToday() } },
            { start: { $lte: getEndOfToday() }, end: { $gte: getStartOfToday() } },
          ],
        },
      }),
    [currentDate],
  );

  const { result: events, isFetching } = useRxData<CalendarEvent>(
    "events",
    queryConstructor,
  );

  useEffect(() => {
    if (!events) return;

    sidebarCalendar.events.set(events.map(sanitizeEvent));
  }, [events]);

  if (isFetching) return "loading...";

  return <ScheduleXCalendar calendarApp={sidebarCalendar} />;
};
