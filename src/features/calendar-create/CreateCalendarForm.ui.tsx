import { useForm } from "react-hook-form"

import { createCalendar } from "@/entities/calendar"
import { CColorPicker } from "@/shared/ui/CColorPicker"
import { CInput } from "@/shared/ui/CInput"

import "./style.scss"

type CreateCalendarFormDate = {
  name: string
  mainColor: string
  containerColor: string
  onContainerColor: string
}

export const CreateCalendarForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateCalendarFormDate>({
    defaultValues: { name: "", mainColor: "#000000", containerColor: "#ffffff", onContainerColor: "#000000" },
  })

  const onSubmit = (data: CreateCalendarFormDate) => {
    createCalendar({
      id: data.name,
      lightColors: {
        main: data.mainColor,
        container: data.containerColor,
        onContainer: data.onContainerColor,
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="calendar-create-form">
      <h3>Create new calendar</h3>

      <label>
        Name:
      </label>
      <CInput name="name" control={control} rules={{ required: true }} errors={errors["name"]} />

      <label>
        Main color:
      </label>
      <CColorPicker name="mainColor" control={control} rules={{ required: true }} errors={errors["mainColor"]} />

      <label>
        Container color:
      </label>
      <CColorPicker
        name="containerColor"
        control={control}
        rules={{ required: true }}
        errors={errors["containerColor"]}
      />

      <label>
        On container color:
      </label>
      <CColorPicker
        name="onContainerColor"
        control={control}
        rules={{ required: true }}
        errors={errors["onContainerColor"]}
      />

      <button type="submit">
        Create
      </button>
    </form>
  )
}
