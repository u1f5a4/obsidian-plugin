import { openModal } from "@/app/pluginModal";
import { CalendarAppSingleton } from "@schedule-x/shared";

class MainPlugin {
  name = "main-caldendar-plugin";
  observer: MutationObserver | null = null;

  init($app: CalendarAppSingleton) {
    const calendarWrapper = $app.elements.calendarWrapper;

    this.initObserver(calendarWrapper);

    $app.config.callbacks = {
      onEventUpdate: (event) => {
        console.log("onEventUpdate", event);
      },
      onEventClick: (event) => {
        console.log("onEventClick", event);
        // TODO: fix toString()
        openModal("BOOOM!", event.id.toString());
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
          // TODO: in the sidebar works without timeout
          setTimeout(() => {
            this.scrollToCurrentTime(mutation);
          }, 500);
        }
      }
    });

    const config = {
      childList: true,
      attributes: true,
      subtree: true,
    };

    this.observer.observe(root, config);
  }

  private scrollToCurrentTime(mutation: MutationRecord) {
    // when init view
    const element = mutation.addedNodes[0] as HTMLElement | undefined;
    if (!element) return;

    if (element?.className === "sx__current-time-indicator") {
      element.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }
  }
}

export default MainPlugin;
