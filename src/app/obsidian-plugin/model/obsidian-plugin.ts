import { Plugin } from "obsidian"

import { initMainView, mainCalendar } from "@/app/main-calendar"
import { database } from "@/app/rxdb"
import { initSidebarView, sidebarCalendar } from "@/app/sidebar-calendar"
import { modalView } from "@/entities/modal"
import { initSettingTab } from "@/pages/settings-tab"

export default class MyPlugin extends Plugin {
  async onload() {
    this.app.workspace.onLayoutReady(async () => {
      await database.init()

      await mainCalendar.init()
      await sidebarCalendar.init()

      await initMainView(this)
      await initSidebarView(this)
      await initSettingTab(this)
      await modalView.init(this)
    })
  }
}
