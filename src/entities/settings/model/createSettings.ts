import { getCollectionSettings, Settings } from ".."

export const createSettings = async (entity: Settings) => {
  const collection = getCollectionSettings()

  return await collection?.insert(entity)
}
