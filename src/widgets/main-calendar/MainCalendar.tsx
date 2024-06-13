import { ScheduleXCalendar } from "@schedule-x/react";
import { CalendarEvent } from "@schedule-x/shared";
import "@schedule-x/theme-default/dist/index.css";
import { useEffect } from "react";
import { useRxData } from "rxdb-hooks";

import { sanitizeEvent } from "@/entities/event";
import { calendar } from "@/modules/main-calendar";

export const CalendarSanitize = ({ events }: { events: CalendarEvent[] }) => {
  useEffect(() => {
    calendar.events.set(events.map(sanitizeEvent));
  }, [events]);

  return <ScheduleXCalendar calendarApp={calendar} />;
};

export const Calendar = () => {
  const { result: allEvents, isFetching } = useRxData<CalendarEvent>(
    "events",
    collection => collection.find(),
  );

  if (isFetching) return "loading...";

  return <CalendarSanitize events={allEvents} />;
};
