import { getCollectionSettings } from ".."

export const createDefaultSettings = async () => {
  const collection = getCollectionSettings()

  return await collection?.insert({
    id: "default",
    favoriteCalendarId: "default",
  })
}
