import { useRxData } from "rxdb-hooks"

import { type Settings as SettingsEntity } from "@/entities/settings"
import { CalendarCreateForm } from "@/features/calendar-create"
import { SelectFavoriteCalendarForm } from "@/features/calendar-favorite"

export const Settings = () => {
  const { result: [settings], isFetching } = useRxData<SettingsEntity>(
    "settings",
    collection => collection.findOne({ selector: {} }),
  )

  if (isFetching) return "loading..."

  return (
    <>
      <h4>Settings</h4>

      <SelectFavoriteCalendarForm favoriteCalendarId={settings.favoriteCalendarId} />

      <hr />

      <CalendarCreateForm />
    </>
  )
}
