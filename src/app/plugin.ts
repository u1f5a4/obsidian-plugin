import { Plugin } from "obsidian";

import { initMainView } from "./pluginMainView";
import { initModal } from "./pluginModal";
import { initSettingTab } from "./pluginSettingTab";
import { initSidebarView } from "./pluginSidebarView";

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default class MyPlugin extends Plugin {
  async onload() {
    await delay(300);
    await initMainView(this);
    await delay(100);
    await initSidebarView(this);
    await delay(100);
    await initSettingTab(this);
    await delay(100);
    initModal(this);
  }
}
