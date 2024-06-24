import { useFormContext } from "react-hook-form"

import { Calendar, createCalendar } from "@/entities/calendar"
import { CColorPicker } from "@/shared/ui/CColorPicker"
import { CInput } from "@/shared/ui/CInput"

import "./style.scss"

type CalendarFormProps = {
  h2: string
  onSubmit: (data: CalendarFormDate) => void
}

export type CalendarFormDate =
  & {
    colorName: Calendar["colorName"]
  }
  & {
    [key in keyof Calendar["lightColors"]]: string
  }

export const CalendarForm = (props: CalendarFormProps) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useFormContext<CalendarFormDate>()

  return (
    <form onSubmit={handleSubmit(props.onSubmit)} className="calendar-form">
      <h3>Create new calendar</h3>

      <label>
        Name:
      </label>
      <CInput name="colorName" control={control} rules={{ required: true }} errors={errors["colorName"]} />

      <label>
        Main color:
      </label>
      <CColorPicker name="main" control={control} rules={{ required: true }} errors={errors["main"]} />

      <label>
        Container color:
      </label>
      <CColorPicker
        name="container"
        control={control}
        rules={{ required: true }}
        errors={errors["container"]}
      />

      <label>
        On container color:
      </label>
      <CColorPicker
        name="onContainer"
        control={control}
        rules={{ required: true }}
        errors={errors["onContainer"]}
      />

      <button type="submit">
        Create
      </button>
    </form>
  )
}
