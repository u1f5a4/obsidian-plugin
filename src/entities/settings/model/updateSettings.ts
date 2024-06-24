import { getCollectionSettings, Settings } from ".."

export const updateSettings = async (entity: Partial<Settings>) => {
  const collection = getCollectionSettings()

  const settings = await collection.findOne({ selector: {} }).exec()
  if (!settings) return

  return await settings.patch(entity)
}
