import { useRxData } from "rxdb-hooks"

import { Calendar } from "@/entities/calendar"
import { type Settings as SettingsEntity } from "@/entities/settings"
import { CalendarCreateForm } from "@/widgets/calendar-create-form"
import { CalendarDeleteForm } from "@/widgets/calendar-delete-form"
import { CalendarEditForm } from "@/widgets/calendar-edit-form"
import { SelectFavoriteCalendarForm } from "@/widgets/calendar-select-favorite-form"

export const SettingsTab = () => {
  const { result: [settings], isFetching: isFetchingSettings } = useRxData<SettingsEntity>(
    "settings",
    collection => collection.findOne({ selector: {} }),
  )

  const { result: calendars, isFetching: isFetchingCalendars } = useRxData<Calendar>(
    "calendars",
    collection => collection.find({}),
  )

  if (isFetchingSettings || isFetchingCalendars) return "loading..."

  return (
    <>
      <h4>Settings-tab</h4>

      <SelectFavoriteCalendarForm calendars={calendars} favoriteCalendarId={settings.favoriteCalendarId} />

      <hr />

      <CalendarCreateForm />

      <hr />

      <CalendarEditForm calendars={calendars} />

      <hr />

      <CalendarDeleteForm calendars={calendars} />
    </>
  )
}
