import { roundToNearestMinutes } from "date-fns"
import { addMinutes, format } from "date-fns/fp"
import { flow } from "lodash"
import { useEffect } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useRxData } from "rxdb-hooks"

import { createEvent, EventForm, EventFormDate } from "@/entities/event"
import { modalView } from "@/entities/modal"
import { Settings } from "@/entities/settings"

export interface CreateProps {
  clickDateTime: string
}

export const EventCreateForm = (props: CreateProps) => {
  const { result: [settings], isFetching } = useRxData<Settings>(
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
    const newEndTime = flow(addMinutes(15), format("HH:mm"))(date)

    setValue("startDate", dateFormat)
    setValue("endDate", dateFormat)
    setValue("startTime", newStartTime)
    setValue("endTime", newEndTime)
  }, [])

  useEffect(() => {
    if (isFetching) return

    setValue("calendarId", settings.favoriteCalendarId)
  }, [isFetching])

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

  if (isFetching) return "loading..."

  return (
    <FormProvider {...methods}>
      <EventForm h1="Create" onSubmit={handleOnSubmit} />
    </FormProvider>
  )
}
