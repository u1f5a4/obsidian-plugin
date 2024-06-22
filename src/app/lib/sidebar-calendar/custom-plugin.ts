import { CalendarAppSingleton } from "@schedule-x/shared"

import { openModal } from "@/app/lib/plugin"
import { updateEvent } from "@/entities/event"

class SidebarPlugin {
  name = "sidebar-caldendar-plugin"

  init($app: CalendarAppSingleton) {
    $app.config.callbacks = {
      onEventUpdate: (event) => {
        updateEvent(String(event.id), event)
      },
      onEventClick: (event) => {
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
      onClickDateTime: (dateTime) => {
        console.log("onClickDateTime", dateTime)
      },
      onClickPlusEvents: (date) => {
        console.log("onClickPlusEvents", date)
      },
    }
  }
}

export default SidebarPlugin
