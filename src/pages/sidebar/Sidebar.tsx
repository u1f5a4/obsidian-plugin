import { SidebarCalendar } from "@/app/lib/sidebar-calendar"

import "./style.scss"

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <SidebarCalendar />
    </div>
  )
}
