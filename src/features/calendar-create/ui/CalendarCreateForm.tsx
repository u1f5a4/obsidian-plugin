import { FormProvider, useForm } from "react-hook-form"

import { CalendarForm, type CalendarFormDate, createCalendar } from "@/entities/calendar"

export const CalendarCreateForm = () => {
  const methods = useForm<CalendarFormDate>({
    defaultValues: { colorName: "", main: "#000000", container: "#ffffff", onContainer: "#000000" },
  })

  const onSubmit = (data: CalendarFormDate) => {
    const { colorName, main, container, onContainer } = data

    createCalendar({
      colorName,
      lightColors: {
        main,
        container,
        onContainer,
      },
    })
  }

  return (
    <FormProvider {...methods}>
      <CalendarForm h2="Create new calendar" onSubmit={onSubmit} />
    </FormProvider>
  )
}
