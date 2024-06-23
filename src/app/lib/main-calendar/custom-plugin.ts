import { CalendarAppSingleton } from "@schedule-x/shared"

import { openModal } from "@/app/lib/plugin"
import { CalendarEvent, updateEvent } from "@/entities/event"

class MainPlugin {
  name = "main-caldendar-plugin"

  init($app: CalendarAppSingleton) {
    $app.config.callbacks = {
      onEventUpdate: (event: CalendarEvent) => {
        updateEvent(event.id, event)
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
      onDoubleClickDate: (date) => {
        console.log("onDoubleClickDate", date)
      },
      onClickDateTime: (clickDateTime) => {
        openModal("onClickDateTime", { clickDateTime })
      },
      onDoubleClickDateTime: (clickDateTime) => {
        console.log("onDoubleClickDateTime", clickDateTime)
      },
      onClickAgendaDate: (date) => {
        console.log("onClickAgendaDate", date)
      },
    }
  }
}

export default MainPlugin
