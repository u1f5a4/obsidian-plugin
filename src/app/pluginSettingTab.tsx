import { App, PluginSettingTab } from "obsidian";
import { StrictMode } from "react";
import { createRoot, Root } from "react-dom/client";

import { IS_DEVELOPMENT, IS_PRODUCTION } from "./constants";
import MyPlugin from "./plugin";
import { ReactApp } from "./ReactApp";

export async function initSettingTab(plugin: MyPlugin) {
  plugin.addSettingTab(new SettingTab(plugin.app, plugin));
}

class SettingTab extends PluginSettingTab {
  root: Root | null = null;

  constructor(app: App, plugin: any) {
    super(app, plugin);
  }

  display(): void {
    this.root = createRoot(this.containerEl);

    if (IS_PRODUCTION) {
      this.root.render(
        <StrictMode>
          <ReactApp page="setting" />
        </StrictMode>,
      );
    }

    if (IS_DEVELOPMENT) {
      this.root.render(
        <ReactApp page="setting" />,
      );
    }
  }

  hide() {
    this.root?.unmount();
  }
}
