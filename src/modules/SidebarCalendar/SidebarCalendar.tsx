import { ScheduleXCalendar } from "@schedule-x/react";
import { CalendarEvent } from "@schedule-x/shared";
import "@schedule-x/theme-default/dist/index.css";
import { useEffect } from "react";
import { useRxData } from "rxdb-hooks";

import { sanitizeEvent } from "@/entities/event";
import { sidebarCalendar } from "./calendar";

export const SidebarCalendar = () => {
  const { result: events, isFetching } = useRxData<CalendarEvent>(
    "events",
    collection => collection.find(),
  );

  useEffect(() => {
    if (!events) return;

    sidebarCalendar.events.set(events.map(sanitizeEvent));
  }, [events]);

  if (isFetching) return "loading...";

  return <ScheduleXCalendar calendarApp={sidebarCalendar} />;
};
