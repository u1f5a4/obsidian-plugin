import { ItemView, WorkspaceLeaf } from "obsidian"
import { StrictMode } from "react"
import { createRoot, Root } from "react-dom/client"

import { ProviderDB } from "@/app/rxdb"
import { IS_DEVELOPMENT, IS_PRODUCTION } from "@/shared/constants"

import { Main } from "./Main"

export const MAIN_VIEW_TYPE = "main-view"

export class MainView extends ItemView {
  root: Root | null = null

  constructor(leaf: WorkspaceLeaf) {
    super(leaf)
  }

  getViewType() {
    return MAIN_VIEW_TYPE
  }

  getDisplayText() {
    return "obsidian-plugin"
  }

  async onOpen() {
    this.root = createRoot(this.containerEl.children[1])

    if (IS_PRODUCTION) {
      this.root.render(
        <StrictMode>
          <ProviderDB>
            <Main />
          </ProviderDB>,
        </StrictMode>,
      )
    }

    if (IS_DEVELOPMENT) {
      this.root.render(
        <ProviderDB>
          <Main />
        </ProviderDB>,
      )
    }
  }

  async onClose() {
    this.root?.unmount()
  }
}
