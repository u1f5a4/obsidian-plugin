import { Control, Controller, FieldError, FieldValues, Path, RegisterOptions } from "react-hook-form"

type CInputProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  rules?: RegisterOptions<T>
  errors: FieldError | undefined
}

export const CColorPicker = <T extends FieldValues>({ name, control, rules, errors }: CInputProps<T>) => {
  const style = {
    border: errors ? "2px solid red" : undefined,
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => <input type="color" style={style} {...field} />}
    />
  )
}
