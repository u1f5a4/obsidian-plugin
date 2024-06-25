import { useEffect } from "react"
import { FormProvider, useForm, useWatch } from "react-hook-form"

import { Calendar, CalendarForm, type CalendarFormDate } from "@/entities/calendar"
import { updateCalendar } from "@/entities/calendar"
import { CSelect } from "@/shared/ui/CSelect"

type CalendarEditFormProps = {
  calendars: Calendar[]
}

type CalendarSelectFormDate = {
  calendarId: Calendar["colorName"]
}

export const CalendarEditForm = (props: CalendarEditFormProps) => {
  // FORM Select Calendar
  const methodsSelect = useForm<CalendarSelectFormDate>({
    defaultValues: { calendarId: props.calendars[0].colorName },
  })

  // FORM Edit Calendar
  const methods = useForm<CalendarFormDate>({
    defaultValues: {
      colorName: "",
      main: "#000000",
      container: "#ffffff",
      onContainer: "#000000",
      type: "local",
      url: "",
    },
  })
  const { setValue } = methods
  const selectedCalendar = useWatch({ control: methodsSelect.control, name: "calendarId" })

  // set current calendar
  useEffect(() => {
    if (!selectedCalendar) return

    const currentCalendar = props.calendars.find(c => c.colorName === selectedCalendar)
    if (!currentCalendar) return

    setValue("colorName", currentCalendar.colorName)
    setValue("main", currentCalendar.lightColors.main)
    setValue("container", currentCalendar.lightColors.container)
    setValue("onContainer", currentCalendar.lightColors.onContainer)
    setValue("type", currentCalendar.type)
    setValue("url", currentCalendar.url)
  }, [selectedCalendar])

  const onSubmit = (data: CalendarFormDate) => {
    const { colorName, main, container, onContainer, type, url } = data
    updateCalendar(colorName, { colorName, lightColors: { main, container, onContainer }, type, url })
  }

  return (
    <>
      <h3>Edit calendar</h3>

      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <label>
          Calendar:
        </label>

        <CSelect<CalendarSelectFormDate, Calendar>
          name="calendarId"
          control={methodsSelect.control}
          rules={{ required: true }}
          options={props.calendars}
          uniqKey="colorName"
        />
      </form>

      <FormProvider {...methods}>
        <CalendarForm onSubmit={onSubmit} buttonText="Save current settings" />
      </FormProvider>
    </>
  )
}
