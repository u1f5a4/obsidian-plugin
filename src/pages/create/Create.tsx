import { roundToNearestMinutes } from "date-fns"
import { addMinutes, format } from "date-fns/fp"
import { flow } from "lodash"
import { useEffect } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"

import { closeModal } from "@/app/lib/plugin"
import { createEvent } from "@/entities/event"
import { EventForm, FieldValues } from "@/features/event-form"

import "./style.scss"

export interface CreateProps {
  clickDateTime: string
}

export const Create = (props: CreateProps) => {
  const methods = useForm<FieldValues>({
    defaultValues: {
      title: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
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

  const handleOnSubmit: SubmitHandler<FieldValues> = (formDate) => {
    const { title, startDate, startTime, endDate, endTime } = formDate

    createEvent({
      title,
      start: `${startDate} ${startTime}`,
      end: `${endDate} ${endTime}`,
    })

    closeModal()
  }

  return (
    <FormProvider {...methods}>
      <EventForm h1="Create" onSubmit={handleOnSubmit} />
    </FormProvider>
  )
}
