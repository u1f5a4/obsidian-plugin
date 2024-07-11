import { useFormContext, useWatch } from "react-hook-form"

import { Calendar } from "@/entities/calendar"
import { CColorPicker } from "@/shared/ui/CColorPicker"
import { CInput } from "@/shared/ui/CInput"
import { CSelect } from "@/shared/ui/CSelect"

import "./style.scss"

type CalendarFormProps = {
  h3?: string
  onSubmit: (data: CalendarFormDate) => void
  buttonText: string
}

export type CalendarFormDate =
  & {
    colorName: Calendar["colorName"]
    type: Calendar["type"]
    url: Calendar["url"]
  }
  & {
    [key in keyof Calendar["lightColors"]]: string
  }

export const CalendarForm = (props: CalendarFormProps) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useFormContext<CalendarFormDate>()

  const type = useWatch({ control, name: "type" })

  return (
    <form onSubmit={handleSubmit(props.onSubmit)} className="calendar-form">
      {props?.h3 && <h3>{props.h3}</h3>}

      <label>
        Name:
      </label>
      <CInput name="colorName" control={control} rules={{ required: true }} errors={errors["colorName"]} />

      <label>
        Type:
      </label>
      <CSelect<CalendarFormDate, { value: Calendar["type"] }>
        name="type"
        control={control}
        rules={{ required: true }}
        errors={errors["type"]}
        options={[{ value: "local" }, { value: "url" }]}
        uniqKey="value"
      />

      {type === "url" && (
        <>
          <label>
            URL:
          </label>
          <CInput
            name="url"
            control={control}
            rules={{ required: true, validate: (value) => value.startsWith("https://") }}
            errors={errors["url"]}
          />
        </>
      )}

      <label>
        Main color:
      </label>
      <CColorPicker name="main" control={control} rules={{ required: true }} errors={errors["main"]} />

      <label>
        Container color:
      </label>
      <CColorPicker
        name="container"
        control={control}
        rules={{ required: true }}
        errors={errors["container"]}
      />

      <label>
        On container color:
      </label>
      <CColorPicker
        name="onContainer"
        control={control}
        rules={{ required: true }}
        errors={errors["onContainer"]}
      />

      <button type="submit">
        {props.buttonText}
      </button>
    </form>
  )
}
