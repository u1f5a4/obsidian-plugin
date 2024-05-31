import { App, PluginSettingTab, Setting } from "obsidian";

import MyPlugin from "../plugin";

interface MyPluginSettings {
  mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
  mySetting: "default1",
};

export default class MyPluginSetting {
  storage: MyPluginSettings;
  plugin: MyPlugin;

  constructor(plugin: MyPlugin) {
    this.plugin = plugin;

    this.main();
  }

  public async saveSettings() {
    await this.plugin.saveData(this.plugin.settings);
  }

  private async main() {
    await this.loadSettings();
    // This adds a settings tab so the user can configure various aspects of the plugin
    this.plugin.addSettingTab(new SampleSettingTab(this.plugin.app, this.plugin));
  }

  private async loadSettings() {
    this.plugin.settings = Object.assign({}, DEFAULT_SETTINGS, await this.plugin.loadData());
  }
}

class SampleSettingTab extends PluginSettingTab {
  plugin: MyPlugin;

  constructor(app: App, plugin: MyPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName("Setting #1")
      .setDesc("It's a secret")
      .addText(text =>
        text
          .setPlaceholder("Enter your secret")
          .setValue(this.plugin.settings.storage.mySetting)
          .onChange(async (value) => {
            this.plugin.settings.storage.mySetting = value;
            await this.plugin.settings.saveSettings();
          })
      );
  }
}
