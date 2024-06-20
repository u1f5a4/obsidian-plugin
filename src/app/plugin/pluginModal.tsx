import { App, Modal } from "obsidian";
import { StrictMode } from "react";
import { createRoot, Root } from "react-dom/client";

import { Create, CreateProps } from "@/pages/create/Create";
import { Read, ReadProps } from "@/pages/read/Read";

import { IS_DEVELOPMENT, IS_PRODUCTION } from "@/app/constants";
import { ProviderRxdb } from "@/app/providerRxdb";

import MyPlugin from "./plugin";

type ModalType = "onClickDateTime" | "onEventClick";
type ModalProps = Partial<CreateProps & ReadProps>;

class SampleModal extends Modal {
  root: Root | null = null;

  constructor(app: App) {
    super(app);
  }

  onOpen() {
  }

  onClose() {
    modal = null;
    this.root?.unmount();
  }

  customOpen(type: ModalType, data: ModalProps) {
    this.open();

    this.root = createRoot(this.containerEl.children[1]);

    const modals: Record<ModalType, JSX.Element> = {
      onClickDateTime: <Create clickDateTime={data?.clickDateTime} />,
      onEventClick: <Read eventClickId={data?.eventClickId} />,
    };

    if (IS_PRODUCTION) {
      this.root.render(
        <StrictMode>
          <ProviderRxdb>
            {modals[type]}
          </ProviderRxdb>
        </StrictMode>,
      );
    }

    if (IS_DEVELOPMENT) {
      this.root.render(
        <ProviderRxdb>
          {modals[type]}
        </ProviderRxdb>,
      );
    }
  }
}

let app: App | null = null;
let modal: SampleModal | null = null;

export async function initModal(plugin: MyPlugin) {
  app = plugin.app;
}

export function openModal(type: ModalType, data: ModalProps) {
  if (!app) throw new Error("[Modal] app is not defined");
  if (modal) closeModal();

  modal = new SampleModal(app);
  modal.customOpen(type, data);
}

export function closeModal() {
  if (!app) throw new Error("[Modal] app is not defined");
  if (!modal) throw new Error("[Modal] modal is not defined");

  modal.close();
}
