import { SidebarCalendar, sidebarCalendar } from "@/app/lib/SidebarCalendar";
import { useScrollToTimeIndicator } from "@/features/ScrollToTimeIndicator";

import "./style.scss";

export const SidebarPage = () => {
  return (
    <div className="sidebar">
      <SidebarCalendar />
    </div>
  );
};
