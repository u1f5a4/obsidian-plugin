import { FormProvider, useForm } from "react-hook-form"

import { CalendarForm, type CalendarFormDate, createCalendar } from "@/entities/calendar"

export const CalendarCreateForm = () => {
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

  const onSubmit = (data: CalendarFormDate) => {
    const { colorName, main, container, onContainer, type, url } = data

    createCalendar({
      colorName,
      lightColors: {
        main,
        container,
        onContainer,
      },
      type,
      url,
    })
  }

  return (
    <FormProvider {...methods}>
      <CalendarForm h3="Create new calendar" onSubmit={onSubmit} buttonText="Create" />
    </FormProvider>
  )
}
