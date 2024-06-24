import { useRxData } from "rxdb-hooks"

import { type Settings as SettingsEntity } from "@/entities/settings"
import { CalendarCreateForm } from "@/features/calendar-create"
import { SelectFavoriteCalendarForm } from "@/features/calendar-favorite"

export const SettingsTab = () => {
  const { result: [settings], isFetching } = useRxData<SettingsEntity>(
    "settings",
    collection => collection.findOne({ selector: {} }),
  )

  if (isFetching) return "loading..."

  return (
    <>
      <h4>Settings-tab</h4>

      <SelectFavoriteCalendarForm favoriteCalendarId={settings.favoriteCalendarId} />

      <hr />

      <CalendarCreateForm />
    </>
  )
}
