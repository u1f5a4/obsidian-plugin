import { App, Modal } from "obsidian"
import { StrictMode } from "react"
import { createRoot, Root } from "react-dom/client"

import { Create, CreateProps } from "@/pages/create/Create"
import { Edit, EditProps } from "@/pages/edit/Edit"
import { Read, ReadProps } from "@/pages/read/Read"

import { ProviderDB } from "@/app/model/rxdb"
import { IS_DEVELOPMENT, IS_PRODUCTION } from "@/constants"

import MyPlugin from "./plugin"

type ModalType = "onClickDateTime" | "onEventClick" | "editEvent"
type ModalProps = Partial<CreateProps & ReadProps & EditProps>

class SampleModal extends Modal {
  root: Root | null = null

  constructor(app: App) {
    super(app)
  }

  onOpen() {
  }

  onClose() {
    modal = null
    this.root?.unmount()
  }

  customOpen(type: ModalType, data: ModalProps) {
    this.open()

    this.root = createRoot(this.containerEl.children[1])

    const modals: Record<ModalType, JSX.Element> = {
      onClickDateTime: data?.clickDateTime ? <Create clickDateTime={data?.clickDateTime} /> : <p>Error</p>,
      onEventClick: data?.eventClickId ? <Read eventClickId={data?.eventClickId} /> : <p>Error</p>,
      editEvent: data?.eventId ? <Edit eventId={data?.eventId} /> : <p>Error</p>,
    }

    if (IS_PRODUCTION) {
      this.root.render(
        <StrictMode>
          <ProviderDB>
            {modals[type]}
          </ProviderDB>
        </StrictMode>,
      )
    }

    if (IS_DEVELOPMENT) {
      this.root.render(
        <ProviderDB>
          {modals[type]}
        </ProviderDB>,
      )
    }
  }
}

let app: App | null = null
let modal: SampleModal | null = null

export async function initModal(plugin: MyPlugin) {
  app = plugin.app
}

export function openModal(type: ModalType, data: ModalProps) {
  if (!app) throw new Error("[Modal] app is not defined")
  if (modal) closeModal()

  modal = new SampleModal(app)
  modal.customOpen(type, data)
}

export function closeModal() {
  if (!app) throw new Error("[Modal] app is not defined")
  if (!modal) throw new Error("[Modal] modal is not defined")

  modal.close()
}
