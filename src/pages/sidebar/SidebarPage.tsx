import { SidebarCalendar } from "@/app/lib/SidebarCalendar";
import { useScrollToTimeIndicator } from "@/features/ScrollToTimeIndicator";

import "./style.scss";

export const SidebarPage = () => {
  useScrollToTimeIndicator("sidebar", 5, 500);

  return (
    <div className="sidebar">
      <SidebarCalendar />
    </div>
  );
};
