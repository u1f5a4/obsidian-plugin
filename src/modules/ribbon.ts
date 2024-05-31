import { Notice } from "obsidian";

import MyPlugin from "src/plugin";

export default class MyPluginRibbon {
  plugin: MyPlugin;

  constructor(plugin: MyPlugin) {
    this.plugin = plugin;

    this.main();
  }

  private main() {
    const ribbonIconEl = this.plugin.addRibbonIcon("dice", "Sample Plugin", (evt: MouseEvent) => {
      // Called when the user clicks the icon.
      new Notice("This is a notice!");
    });
    // Perform additional things with the ribbon
    ribbonIconEl.addClass("my-plugin-ribbon-class");
  }
}
