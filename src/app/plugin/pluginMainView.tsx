import { ItemView, WorkspaceLeaf } from "obsidian";
import { StrictMode } from "react";
import { createRoot, Root } from "react-dom/client";

import { IS_DEVELOPMENT, IS_PRODUCTION } from "@/app/constants";
import { ProviderRxdb } from "@/app/providerRxdb";
import { MainPage } from "@/pages/main/MainPage";

import MyPlugin from "./plugin";

export const MAIN_VIEW_TYPE = "main-view";

export async function initMainView(plugin: MyPlugin) {
  plugin.registerView(
    MAIN_VIEW_TYPE,
    (leaf) => new MainView(leaf),
  );

  plugin.addRibbonIcon("calendar", "Activate view", async () => {
    const { workspace } = plugin.app;

    let leaf: WorkspaceLeaf | null = null;
    const leaves = workspace.getLeavesOfType(MAIN_VIEW_TYPE);

    if (leaves.length > 0) {
      leaf = leaves[0];
    } else {
      leaf = workspace.getLeaf(false);
      await leaf?.setViewState({ type: MAIN_VIEW_TYPE, active: true });
    }

    if (leaf) workspace.revealLeaf(leaf);
  });
}

class MainView extends ItemView {
  root: Root | null = null;

  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return MAIN_VIEW_TYPE;
  }

  getDisplayText() {
    return "obsidian-plugin";
  }

  async onOpen() {
    this.root = createRoot(this.containerEl.children[1]);

    if (IS_PRODUCTION) {
      this.root.render(
        <StrictMode>
          <ProviderRxdb>
            <MainPage />
          </ProviderRxdb>,
        </StrictMode>,
      );
    }

    if (IS_DEVELOPMENT) {
      this.root.render(
        <ProviderRxdb>
          <MainPage />
        </ProviderRxdb>,
      );
    }
  }

  async onClose() {
    this.root?.unmount();
  }
}
