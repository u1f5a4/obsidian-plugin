import { useForm } from "react-hook-form"

import { Calendar } from "@/entities/calendar"
import { updateSettings } from "@/entities/settings"

import "./style.scss"
import { CSelect } from "@/shared/ui/CSelect"

type SelectFavoriteCalendarFormProps = {
  calendars: Calendar[]
  favoriteCalendarId: string
}

type SelectFavoriteCalendarFormDate = {
  favoriteCalendarId: string
}

export const SelectFavoriteCalendarForm = (props: SelectFavoriteCalendarFormProps) => {
  const {
    handleSubmit,
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
    <form onSubmit={handleSubmit(onSubmit)} className="calendar-select-favorite-form">
      <h3>Set favorite calendar</h3>

      <label>
        Favorite calendar:
      </label>

      <CSelect<SelectFavoriteCalendarFormDate, Calendar>
        name="favoriteCalendarId"
        control={control}
        rules={{ required: true }}
        options={props.calendars}
        uniqKey="colorName"
      />

      <button type="submit">
        Save
      </button>
    </form>
  )
}
