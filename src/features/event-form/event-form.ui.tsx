import { useFormContext } from "react-hook-form"

import { CInput } from "@/shared/ui/CInput"
import { CSelectDate } from "@/shared/ui/CSelectDate"
import { CSelectTime } from "@/shared/ui/CSelectTime"

import "./style.scss"

export interface EventFormProps extends Partial<FieldValues> {
  h1: string
  onSubmit: (data: FieldValues) => void
}

export interface FieldValues {
  title: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
}

export const EventForm = (props: EventFormProps) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useFormContext<FieldValues>()

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
        <CSelectDate<FieldValues>
          name="endDate"
          control={control}
          rules={{ required: true, validate: validate.validateEnd }}
          errors={errors["endDate"]}
        />
        <CSelectTime<FieldValues>
          name="endTime"
          control={control}
          rules={{ required: true, validate: validate.validateEnd }}
          errors={errors["endTime"]}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}
