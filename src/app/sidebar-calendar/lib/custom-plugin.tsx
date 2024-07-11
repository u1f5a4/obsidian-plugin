import { CalendarAppSingleton } from "@schedule-x/shared"

import { type CalendarEvent, updateEvent } from "@/entities/event"
import { modalView } from "@/entities/modal"
import { EventCreateForm } from "@/widgets/event-create-form"
import { EventRead } from "@/widgets/event-read"

class SidebarPlugin {
  name = "sidebar-caldendar-plugin"

  init($app: CalendarAppSingleton) {
    $app.config.callbacks = {
      onEventUpdate: (event: CalendarEvent) => {
        updateEvent(event.id, event)
      },
      onEventClick: (event) => {
        modalView.open(<EventRead eventClickId={String(event.id)} />)
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
        modalView.open(<EventCreateForm clickDateTime={String(clickDateTime)} />)
      },
      onDoubleClickDateTime: (clickDateTime) => {
        console.log("onDoubleClickDateTime", clickDateTime)
      },
      onClickAgendaDate: (date) => {
        console.log("onClickAgendaDate", date)
      },
      onClickPlusEvents: (date) => {
        console.log("onClickPlusEvents", date)
      },
    }
  }
}

export default SidebarPlugin
