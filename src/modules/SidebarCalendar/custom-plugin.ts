import { CalendarAppSingleton } from "@schedule-x/shared";

class SidebarPlugin {
  name = "sidebar-caldendar-plugin";

  init($app: CalendarAppSingleton) {
    $app.config.callbacks = {
      onEventUpdate: (event) => {
        console.log("onEventUpdate", event);
      },
      onEventClick: (event) => {
        console.log("onEventClick", event);
      },
      onRangeUpdate: (range) => {
        console.log("onRangeUpdate", range);
      },
      onSelectedDateUpdate: (date) => {
        console.log("onSelectedDateUpdate", date);
      },
      onClickDate: (date) => {
        console.log("onClickDate", date);
      },
      onClickDateTime: (dateTime) => {
        console.log("onClickDateTime", dateTime);
      },
      onClickPlusEvents: (date) => {
        console.log("onClickPlusEvents", date);
      },
    };
  }
}

export default SidebarPlugin;
