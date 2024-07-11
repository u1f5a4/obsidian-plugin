import { roundToNearestMinutes } from "date-fns"
import { addMinutes, format } from "date-fns/fp"
import { flow } from "lodash"
import { useEffect } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useRxData } from "rxdb-hooks"

import { type Calendar } from "@/entities/calendar"
import { createEvent, EventForm, type EventFormDate } from "@/entities/event"
import { modalView } from "@/entities/modal"
import { Settings } from "@/entities/settings"

export interface CreateProps {
  clickDateTime: string
}

export const EventCreateForm = (props: CreateProps) => {
  const { result: calendars, isFetching: isFetchingCalendars } = useRxData<Calendar>(
    "calendars",
    collection => collection.find({}),
  )

  const { result: [settings], isFetching: isFetchingSettings } = useRxData<Settings>(
    "settings",
    collection => collection.findOne({ selector: {} }),
  )

  const methods = useForm<EventFormDate>({
    defaultValues: {
      title: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      calendarId: "",
    },
  })
  const { setValue } = methods

  useEffect(() => {
    const { clickDateTime } = props
    if (!clickDateTime) return

    const date = roundToNearestMinutes(clickDateTime, { nearestTo: 15 })
    const dateFormat = format("yyyy-MM-dd")(date)
    const newStartTime = format("HH:mm")(date)
    const newEndTime = flow(addMinutes(30), format("HH:mm"))(date)

    setValue("startDate", dateFormat)
    setValue("endDate", dateFormat)
    setValue("startTime", newStartTime)
    setValue("endTime", newEndTime)
  }, [])

  useEffect(() => {
    if (isFetchingSettings) return

    setValue("calendarId", settings.favoriteCalendarId)
  }, [isFetchingSettings])

  const handleOnSubmit: SubmitHandler<EventFormDate> = (formDate) => {
    const { title, startDate, startTime, endDate, endTime, calendarId } = formDate

    createEvent({
      title,
      start: `${startDate} ${startTime}`,
      end: `${endDate} ${endTime}`,
      calendarId,
    })

    modalView.close()
  }

  if (isFetchingSettings || isFetchingCalendars) return "loading..."

  return (
    <FormProvider {...methods}>
      <EventForm h1="Create" onSubmit={handleOnSubmit} buttonText="Create" calendars={calendars} />
    </FormProvider>
  )
}
