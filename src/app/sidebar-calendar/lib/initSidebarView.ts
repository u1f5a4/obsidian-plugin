import { WorkspaceLeaf } from "obsidian"

import MyPlugin from "@/app/obsidian-plugin"

import { SidebarView } from ".."

export const SIDE_VIEW_TYPE = "side-view"

export async function initSidebarView(plugin: MyPlugin) {
  plugin.registerView(
    SIDE_VIEW_TYPE,
    (leaf) => new SidebarView(leaf),
  )

  plugin.addRibbonIcon("sidebar", "Activate sidebar view", async () => {
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
  }).addClass("obsidian-plugin-ribbon-class-activate-sidebar-view")
}
