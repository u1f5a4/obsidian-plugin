import { CalendarAppSingleton } from "@schedule-x/shared"

import { openModal } from "@/app/lib/plugin"
import { updateEvent } from "@/entities/event"

class MainPlugin {
  name = "main-caldendar-plugin"

  init($app: CalendarAppSingleton) {
    $app.config.callbacks = {
      onEventUpdate: (event) => {
        console.log("onEventUpdate", event)

        updateEvent(String(event.id), event)
      },
      onEventClick: (event) => {
        console.log("onEventClick", event)

        openModal("onEventClick", { eventClickId: String(event.id) })
      },
      onRangeUpdate: (range) => {
        console.log("onRangeUpdate", range)
      },
      onSelectedDateUpdate: (date) => {
        console.log("onSelectedDateUpdate", date)
      },
      onClickDate: (date) => {
        console.log("onClickDate", date)
      },
      onClickDateTime: (clickDateTime) => {
        console.log("onClickDateTime", clickDateTime)

        openModal("onClickDateTime", { clickDateTime })
      },
      onClickPlusEvents: (date) => {
        console.log("onClickPlusEvents", date)
      },
    }
  }
}

export default MainPlugin
