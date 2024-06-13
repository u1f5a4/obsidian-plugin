import { App, ItemView, Modal, WorkspaceLeaf } from "obsidian";
import { StrictMode } from "react";
import { createRoot, Root } from "react-dom/client";

import { IS_DEVELOPMENT, IS_PRODUCTION } from "./constants";
import MyPlugin from "./plugin";
import { ReactApp } from "./ReactApp";

export const MAIN_VIEW_TYPE = "main-view";

let app: App | null = null;
export async function initModal(plugin: MyPlugin) {
  app = plugin.app;
}

export function openModal(type: string, id: string) {
  if (!app) throw new Error("[Modal] app is not defined");
  new SampleModal(app).customOpen(type, id);
}

class SampleModal extends Modal {
  root: Root | null = null;
  type: string | null = null;
  id: string | null = null;

  constructor(app: App) {
    super(app);
  }

  onOpen() {
  }

  onClose() {
    this.root?.unmount();
  }

  customOpen(type: string, id: string) {
    this.open();

    this.root = createRoot(this.containerEl.children[1]);

    if (IS_PRODUCTION) {
      this.root.render(
        <StrictMode>
          <ReactApp page="modal" type={type} id={id} />
        </StrictMode>,
      );
    }

    if (IS_DEVELOPMENT) {
      this.root.render(
        <ReactApp page="modal" type={type} id={id} />,
      );
    }
  }
}
