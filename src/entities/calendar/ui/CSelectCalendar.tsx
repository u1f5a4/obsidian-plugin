import { Control, Controller, FieldError, FieldValues, Path, RegisterOptions } from "react-hook-form"
import { useRxData } from "rxdb-hooks"

import { Calendar } from ".."

type CSelectCalendarProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  rules?: RegisterOptions<T>
  errors: FieldError | undefined
}

export const CSelectCalendar = <T extends FieldValues>(
  { name, control, rules, errors }: CSelectCalendarProps<T>,
) => {
  const { result, isFetching } = useRxData<Calendar>(
    "calendars",
    collection => collection.find({}),
  )

  if (isFetching) return <div>Loading...</div>

  if (result.length === 0) return <div style={{ color: "red" }}>[ERROR] No calendars</div>

  const style = {
    width: "100%",
    border: errors ? "2px solid red" : undefined,
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <select style={style} {...field}>
          {result?.map(calendar => (
            <option key={calendar.colorName} value={calendar.colorName}>
              {calendar.colorName}
            </option>
          ))}
        </select>
      )}
    />
  )
}
