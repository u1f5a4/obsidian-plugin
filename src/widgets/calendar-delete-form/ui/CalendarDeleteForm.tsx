import { useForm } from "react-hook-form"

import { Calendar, deleteCalendar } from "@/entities/calendar"
import { CSelect } from "@/shared/ui/CSelect"

type CalendarDeleteFormProps = {
  calendars: Calendar[]
}

type CalendarDeleteFormDate = {
  calendarId: Calendar["colorName"]
}

export const CalendarDeleteForm = (props: CalendarDeleteFormProps) => {
  const {
    handleSubmit,
    control,
  } = useForm<CalendarDeleteFormDate>({
    defaultValues: {
      calendarId: props.calendars[0].colorName,
    },
  })

  const onSubmit = (data: CalendarDeleteFormDate) => {
    deleteCalendar(data.calendarId)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Delete calendar</h3>

      <label>
        Calendar:
      </label>

      <CSelect<CalendarDeleteFormDate, Calendar>
        name="calendarId"
        control={control}
        rules={{ required: true }}
        options={props.calendars}
        uniqKey="colorName"
      />

      <button type="submit">Delete calendar</button>
    </form>
  )
}
