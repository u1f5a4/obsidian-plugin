import { useRxData } from "rxdb-hooks"

import { type Settings as SettingsEntity } from "@/entities/settings"
import { CreateCalendarForm } from "@/features/calendar-create"
import { SelectFavoriteCalendarForm } from "@/features/calendar-favorite"
import { useEffect, useState } from "react"

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

      <CreateCalendarForm />
    </>
  )
}
