import { format } from "date-fns/fp"
import { useEffect } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useRxData } from "rxdb-hooks"

import { type Calendar } from "@/entities/calendar"
import { type CalendarEvent, sanitizeEvent, updateEvent } from "@/entities/event"
import { EventForm, type EventFormDate } from "@/entities/event"
import { modalView } from "@/entities/modal"

export interface EditProps {
  eventId: CalendarEvent["id"]
}

export const EventEditForm = (props: EditProps) => {
  const { result: calendars, isFetching: isFetchingCalendars } = useRxData<Calendar>(
    "calendars",
    collection => collection.find({}),
  )

  const { result: [event], isFetching: isFetchingEvents } = useRxData<CalendarEvent>(
    "events",
    collection => collection.findOne({ selector: { id: props.eventId } }),
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
    if (!event) return

    setValue("title", event.title)
    setValue("calendarId", event.calendarId)

    const start = new Date(event.start)
    const startDate = format("yyyy-MM-dd")(start)
    const startTime = format("HH:mm")(start)
    setValue("startDate", startDate)
    setValue("startTime", startTime)

    const end = new Date(event.end)
    const endDate = format("yyyy-MM-dd")(end)
    const endTime = format("HH:mm")(end)
    setValue("endDate", endDate)
    setValue("endTime", endTime)
  }, [event])

  if (isFetchingEvents || isFetchingCalendars) return <div>Loading...</div>

  const handleOnSubmit: SubmitHandler<EventFormDate> = async (formDate) => {
    const event = {
      id: props.eventId,
      title: formDate.title,
      start: `${formDate.startDate} ${formDate.startTime}`,
      end: `${formDate.endDate} ${formDate.endTime}`,
      calendarId: formDate.calendarId,
    }

    await updateEvent(event.id, sanitizeEvent(event))

    modalView.close()
  }

  return (
    <FormProvider {...methods}>
      <EventForm h1="Edit" onSubmit={handleOnSubmit} buttonText="Save" calendars={calendars} />
    </FormProvider>
  )
}
