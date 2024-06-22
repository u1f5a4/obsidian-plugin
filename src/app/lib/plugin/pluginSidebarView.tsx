import { ItemView, WorkspaceLeaf } from "obsidian"
import { StrictMode } from "react"
import { createRoot, Root } from "react-dom/client"

import { IS_DEVELOPMENT, IS_PRODUCTION } from "@/app/constants"
import { ProviderDB } from "@/app/model/rxdb"
import { Sidebar } from "@/pages/sidebar"

import MyPlugin from "./plugin"

export const SIDE_VIEW_TYPE = "side-view"

export async function initSidebarView(plugin: MyPlugin) {
  plugin.registerView(
    SIDE_VIEW_TYPE,
    (leaf) => new SidebarView(leaf),
  )

  plugin.addRibbonIcon("sidebar", "Activate view", async () => {
    const { workspace } = plugin.app

    let leaf: WorkspaceLeaf | null = null
    const leaves = workspace.getLeavesOfType(SIDE_VIEW_TYPE)

    if (leaves.length > 0) {
      leaf = leaves[0]
    } else {
      leaf = workspace.getRightLeaf(false)
      await leaf?.setViewState({ type: SIDE_VIEW_TYPE, active: true })
    }

    if (leaf) workspace.revealLeaf(leaf)
  })
}

class SidebarView extends ItemView {
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
