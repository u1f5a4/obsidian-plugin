import { App } from "obsidian"
import { ReactElement } from "react"

import MyPlugin from "@/app/obsidian-plugin"

import { CustomModal } from ".."

class ModalView {
  app: App | null = null
  modal: CustomModal | null = null

  async init(plugin: MyPlugin) {
    this.app = plugin.app
  }

  open(children: ReactElement) {
    if (!this.app) throw new Error("[ModalView] app is not defined")

    this.modal = new CustomModal(this.app)
    this.modal.customOpen(children)
  }

  close() {
    if (!this.app) throw new Error("[ModalView] app is not defined")
    if (!this.modal) throw new Error("[ModalView] modal is not defined")

    this.modal.close()
  }
}

export const modalView = new ModalView()
