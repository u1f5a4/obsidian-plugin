import Datastore from "@seald-io/nedb";
import { Plugin } from "obsidian";

import MyPluginCommand from "./modules/command";
import MyPluginRibbon from "./modules/ribbon";
import MyPluginSetting from "./modules/setting";

export default class MyPlugin extends Plugin {
  settings: MyPluginSetting;

  async onload() {
    const db = new Datastore({ filename: "db", autoload: true });

    this.settings = new MyPluginSetting(this);

    new MyPluginRibbon(this);

    // This adds a status bar item to the bottom of the app. Does not work on mobile apps.
    const statusBarItemEl = this.addStatusBarItem();
    statusBarItemEl.setText("Status Bar Text");

    new MyPluginCommand(this);
  }

  onunload() {
  }
}
