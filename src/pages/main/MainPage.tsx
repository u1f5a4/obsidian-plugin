import { MainCalendar } from "@/app/lib/MainCalendar";
import { useScrollToTimeIndicator } from "@/features/ScrollToTimeIndicator";

import "./style.scss";

export const MainPage = () => {
  useScrollToTimeIndicator("main-page");

  return (
    <div className="main-page">
      <MainCalendar />
    </div>
  );
};
