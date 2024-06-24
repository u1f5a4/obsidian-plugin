import { WorkspaceLeaf } from "obsidian"

import MyPlugin from "@/app/obsidian-plugin"

import { MAIN_VIEW_TYPE, MainView } from ".."

export async function initMainView(plugin: MyPlugin) {
  plugin.registerView(
    MAIN_VIEW_TYPE,
    (leaf) => new MainView(leaf),
  )

  plugin.addRibbonIcon("calendar", "Activate view", async () => {
    const { workspace } = plugin.app

    let leaf: WorkspaceLeaf | null = null
    const leaves = workspace.getLeavesOfType(MAIN_VIEW_TYPE)

    if (leaves.length > 0) {
      leaf = leaves[0]
    } else {
      leaf = workspace.getLeaf(false)
      await leaf?.setViewState({ type: MAIN_VIEW_TYPE, active: true })
    }

    if (leaf) workspace.revealLeaf(leaf)
  })
}
