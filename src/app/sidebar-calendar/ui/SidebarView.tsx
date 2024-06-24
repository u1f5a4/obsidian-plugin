import { ItemView, WorkspaceLeaf } from "obsidian"
import { StrictMode } from "react"
import { createRoot, Root } from "react-dom/client"

import { ProviderDB } from "@/app/rxdb"
import { IS_DEVELOPMENT, IS_PRODUCTION } from "@/shared/constants"

import { SIDE_VIEW_TYPE, Sidebar } from ".."

export class SidebarView extends ItemView {
  root: Root | null = null

  constructor(leaf: WorkspaceLeaf) {
    super(leaf)
  }

  getViewType() {
    return SIDE_VIEW_TYPE
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
            <Sidebar />
          </ProviderDB>,
        </StrictMode>,
      )
    }

    if (IS_DEVELOPMENT) {
      this.root.render(
        <ProviderDB>
          <Sidebar />
        </ProviderDB>,
      )
    }
  }

  async onClose() {
    this.root?.unmount()
  }
}
