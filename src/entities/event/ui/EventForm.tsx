import { useFormContext } from "react-hook-form"

import { Calendar } from "@/entities/calendar"
import { CInput } from "@/shared/ui/CInput"
import { CSelectDate } from "@/shared/ui/CSelectDate"
import { CSelectTime } from "@/shared/ui/CSelectTime"

import "./style.scss"
import { CSelect } from "@/shared/ui/CSelect"

export interface EventFormDate {
  title: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  calendarId: string
}

export interface EventFormProps {
  h1: string
  onSubmit: (data: EventFormDate) => void
  buttonText: string
  calendars: Calendar[]
}

export const EventForm = (props: EventFormProps) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useFormContext<EventFormDate>()

  const validate = {
    validateEnd: () => {
      const [startDate, startTime] = getValues(["startDate", "startTime"])
      const [endDate, endTime] = getValues(["endDate", "endTime"])

      const start = new Date(`${startDate} ${startTime}`).getTime()
      const end = new Date(`${endDate} ${endTime}`).getTime()

      if (start > end) return false
      return true
    },
  }

  return (
    <form onSubmit={handleSubmit(props.onSubmit)} className="event-form">
      <h1>{props.h1}</h1>

      <label>
        Title:
      </label>
      <CInput
        name="title"
        control={control}
        rules={{ required: true }}
        errors={errors["title"]}
        autoFocus
      />

      <label>
        Start:
      </label>
      <div>
        <CSelectDate
          name="startDate"
          control={control}
          rules={{ required: true }}
          errors={errors["startDate"]}
        />
        <CSelectTime
          name="startTime"
          control={control}
          rules={{ required: true }}
          errors={errors["startTime"]}
        />
      </div>

      <label>
        End:
      </label>
      <div>
        <CSelectDate<EventFormDate>
          name="endDate"
          control={control}
          rules={{ required: true, validate: validate.validateEnd }}
          errors={errors["endDate"]}
        />
        <CSelectTime<EventFormDate>
          name="endTime"
          control={control}
          rules={{ required: true, validate: validate.validateEnd }}
          errors={errors["endTime"]}
        />
      </div>

      <label>
        Select Calendar:
      </label>
      <CSelect<EventFormDate, Calendar>
        name="calendarId"
        control={control}
        rules={{ required: true }}
        errors={errors["calendarId"]}
        options={props.calendars}
        uniqKey="colorName"
      />

      <button type="submit">{props.buttonText}</button>
    </form>
  )
}
