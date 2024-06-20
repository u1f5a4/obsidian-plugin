import { App, PluginSettingTab } from "obsidian";
import { StrictMode } from "react";
import { createRoot, Root } from "react-dom/client";

import { SettingPage } from "@/pages/setting/SettingPage";

import { IS_DEVELOPMENT, IS_PRODUCTION } from "@/app/constants";

import type MyPlugin from "./plugin";

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
          <SettingPage />
        </StrictMode>,
      );
    }

    if (IS_DEVELOPMENT) {
      this.root.render(
        <SettingPage />,
      );
    }
  }

  hide() {
    this.root?.unmount();
  }
}