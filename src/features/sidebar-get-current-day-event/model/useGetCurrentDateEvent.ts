import { endOfDay, format, startOfDay } from "date-fns"
import { useCallback } from "react"
import { RxCollection, RxDocument } from "rxdb"
import { useRxData } from "rxdb-hooks"

import { CalendarEvent } from "@/entities/event"

const getToday = () => new Date()
const getStartOfToday = () => format(startOfDay(getToday()), "yyyy-MM-dd HH:mm")
const getEndOfToday = () => format(endOfDay(getToday()), "yyyy-MM-dd HH:mm")

type useGetCurrentDayEventProps = {
  currentDate: string
}

export const useGetCurrentDayEvent = (
  { currentDate }: useGetCurrentDayEventProps,
): [RxDocument<CalendarEvent>[], boolean] => {
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
  )

  const { result: events, isFetching } = useRxData<CalendarEvent>(
    "events",
    queryConstructor,
  )

  return [events, isFetching]
}
