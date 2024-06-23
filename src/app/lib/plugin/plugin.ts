import { Plugin } from "obsidian"

import { database } from "@/app/model/rxdb"
import { mainCalendar } from "../main-calendar"
import { sidebarCalendar } from "../sidebar-calendar"
import { initMainView } from "./pluginMainView"
import { initModal } from "./pluginModal"
import { initSettingTab } from "./pluginSettingTab"
import { initSidebarView } from "./pluginSidebarView"

export default class MyPlugin extends Plugin {
  async onload() {
    this.app.workspace.onLayoutReady(async () => {
      await database.init()

      await mainCalendar.init()
      await sidebarCalendar.init()

      await initMainView(this)
      await initSidebarView(this)
      await initSettingTab(this)
      await initModal(this)
    })
  }
}
