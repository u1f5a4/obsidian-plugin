import { RxJsonSchema } from "rxdb"

export interface CalendarEntity {
  id: string
  lightColors: {
    main: string
    container: string
    onContainer: string
  }
}

export const calendarSchema: RxJsonSchema<CalendarEntity> = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: { type: "string", pattern: "^[a-z]+$", maxLength: 32 },
    lightColors: {
      type: "object",
      properties: {
        main: { type: "string", pattern: "^#[0-9a-fA-F]{6}$" },
        container: { type: "string", pattern: "^#[0-9a-fA-F]{6}$" },
        onContainer: { type: "string", pattern: "^#[0-9a-fA-F]{6}$" },
      },
      required: ["main", "container", "onContainer"],
    },
  },
  required: ["id", "lightColors"],
}
