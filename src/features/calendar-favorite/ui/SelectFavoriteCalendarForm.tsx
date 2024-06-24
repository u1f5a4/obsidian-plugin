import { useForm } from "react-hook-form"

import { CSelectCalendar } from "@/entities/calendar"
import { updateSettings } from "@/entities/settings"

import "./style.scss"

type SelectFavoriteCalendarFormProps = {
  favoriteCalendarId: string
}

type SelectFavoriteCalendarFormDate = {
  favoriteCalendarId: string
}

export const SelectFavoriteCalendarForm = (props: SelectFavoriteCalendarFormProps) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SelectFavoriteCalendarFormDate>({
    defaultValues: {
      favoriteCalendarId: props.favoriteCalendarId,
    },
  })

  const onSubmit = (data: SelectFavoriteCalendarFormDate) => {
    updateSettings({ favoriteCalendarId: data.favoriteCalendarId })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="select-favorite-calendar-form">
      <h3>Set favorite calendar</h3>

      <label>
        Favorite calendar:
      </label>

      <CSelectCalendar<SelectFavoriteCalendarFormDate>
        name="favoriteCalendarId"
        control={control}
        rules={{ required: true }}
        errors={errors["favoriteCalendarId"]}
      />

      <button type="submit">
        Save
      </button>
    </form>
  )
}
