import { Plugin } from "obsidian"

import { database } from "@/app/model/rxdb"
import { initMainView } from "./pluginMainView"
import { initModal } from "./pluginModal"
import { initSettingTab } from "./pluginSettingTab"
import { initSidebarView } from "./pluginSidebarView"

export default class MyPlugin extends Plugin {
  async onload() {
    this.app.workspace.onLayoutReady(async () => {
      await database.init()

      await initMainView(this)
      await initSidebarView(this)
      await initSettingTab(this)
      await initModal(this)
    })
  }
}
