import type MyPlugin from "@/app/obsidian-plugin"

import { SettingsView } from ".."

export async function initSettingTab(plugin: MyPlugin) {
  plugin.addSettingTab(new SettingsView(plugin.app, plugin))
}
