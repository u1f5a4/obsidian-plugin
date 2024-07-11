import { RxJsonSchema } from "rxdb"

export interface Calendar {
  colorName: string
  lightColors: ColorScheme

  type: "local" | "url"
  url: string
}

interface ColorScheme {
  main: string
  container: string
  onContainer: string
}

export const schemaCalendar: RxJsonSchema<Calendar> = {
  version: 0,
  primaryKey: "colorName",
  type: "object",
  properties: {
    colorName: { type: "string", pattern: "^[a-z]+$", maxLength: 32 },
    lightColors: {
      type: "object",
      properties: {
        main: { type: "string", pattern: "^#[0-9a-fA-F]{6}$" },
        container: { type: "string", pattern: "^#[0-9a-fA-F]{6}$" },
        onContainer: { type: "string", pattern: "^#[0-9a-fA-F]{6}$" },
      },
      required: ["main", "container", "onContainer"],
    },

    type: { type: "string" },
    url: { type: "string" },
  },
  required: ["colorName", "lightColors", "type"],
}
