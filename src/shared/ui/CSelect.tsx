import { useEffect, useRef } from "react"
import { Control, Controller, FieldError, FieldValues, Path, RegisterOptions, useWatch } from "react-hook-form"

type CSelect<T extends FieldValues, K> = {
  name: Path<T>
  control: Control<T>
  rules?: RegisterOptions<T>
  errors?: FieldError
  options: K[]
  uniqKey: keyof K
}

export const CSelect = <T extends FieldValues, K>(
  { name, control, rules, errors, options, uniqKey }: CSelect<T, K>,
) => {
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
        <select
          style={style}
          {...field}
        >
          {options.map((entity) => {
            const key = String(entity[uniqKey])
            const value = String(entity[uniqKey])

            return (
              <option key={key} value={value}>
                {value}
              </option>
            )
          })}
        </select>
      )}
    />
  )
}
