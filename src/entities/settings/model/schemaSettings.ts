import { RxJsonSchema } from "rxdb"

export interface Settings {
  id: string
  favoriteCalendarId: string
}

export const schemaSettings: RxJsonSchema<Settings> = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: { type: "string", maxLength: 32 },
    favoriteCalendarId: { type: "string" },
  },
  required: ["id", "favoriteCalendarId"],
}
