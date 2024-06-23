import { format } from "date-fns/fp"
import { useEffect } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useRxData } from "rxdb-hooks"

import { closeModal } from "@/app/lib/plugin"
import { CalendarEvent, sanitizeEvent, updateEvent } from "@/entities/event"
import { EventForm, EventFormDate } from "@/features/event-form"

import "./style.scss"

export interface EditProps {
  eventId: CalendarEvent["id"]
}

export const Edit = (props: EditProps) => {
  const { result: [event], isFetching } = useRxData<CalendarEvent>(
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

  if (isFetching) return <div>Loading...</div>

  const handleOnSubmit: SubmitHandler<EventFormDate> = async (formDate) => {
    const event = {
      id: props.eventId,
      title: formDate.title,
      start: `${formDate.startDate} ${formDate.startTime}`,
      end: `${formDate.endDate} ${formDate.endTime}`,
      calendarId: formDate.calendarId,
    }

    await updateEvent(event.id, sanitizeEvent(event))

    closeModal()
  }

  return (
    <FormProvider {...methods}>
      <EventForm h1="Edit" onSubmit={handleOnSubmit} />
    </FormProvider>
  )
}
