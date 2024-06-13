import { CalendarAppSingleton } from "@schedule-x/shared";
import { calendarControls } from "./sidebar-calendar";

class SidebarPlugin {
  name = "sidebar-caldendar-plugin";
  observer: MutationObserver | null = null;

  init($app: CalendarAppSingleton) {
    const calendarWrapper = $app.elements.calendarWrapper;

    this.initObserver(calendarWrapper);
    this.removeHeader(calendarWrapper);

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

  private initObserver(root: HTMLElement | undefined) {
    if (!root) return;

    this.observer = new MutationObserver((mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          // TODO: work only init view
          this.scrollToCurrentTime(mutation);

          // TODO: often called?
          this.ensureCurrentDate();
        }
      }
    });

    const config = {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
    };

    this.observer.observe(root, config);
  }

  private ensureCurrentDate() {
    const current = this.getCurrentDate();
    const calendarLeaf = calendarControls.getDate();

    if (current === calendarLeaf) return;
    calendarControls.setDate(current);
  }

  private getCurrentDate() {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = date.toLocaleDateString("en-CA", options);
    return formattedDate.replace(/\//g, "-");
  }

  private scrollToCurrentTime(mutation: MutationRecord) {
    let element = mutation.addedNodes[0] as HTMLElement | undefined;
    if (!element) return;

    if (element?.className === "sx__current-time-indicator") {
      element.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }
  }

  private removeHeader(element: HTMLDivElement | undefined) {
    if (!element) return;

    if (element?.className === "sx__week-grid__date sx__week-grid__date--is-today") {
      element.remove();
    }
  }
}

export default SidebarPlugin;
