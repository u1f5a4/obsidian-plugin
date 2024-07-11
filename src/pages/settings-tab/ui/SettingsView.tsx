import { App, PluginSettingTab } from "obsidian"
import { StrictMode } from "react"
import { createRoot, Root } from "react-dom/client"

import { SettingsTab } from "@/pages/settings-tab"

import { IS_DEVELOPMENT, IS_PRODUCTION } from "@/shared/constants"

import { ProviderDB } from "@/app/rxdb"

export class SettingsView extends PluginSettingTab {
  root: Root | null = null

  constructor(app: App, plugin: any) {
    super(app, plugin)
  }

  display(): void {
    this.root = createRoot(this.containerEl)

    if (IS_PRODUCTION) {
      this.root.render(
        <StrictMode>
          <ProviderDB>
            <SettingsTab />
          </ProviderDB>
        </StrictMode>,
      )
    }

    if (IS_DEVELOPMENT) {
      this.root.render(
        <ProviderDB>
          <SettingsTab />
        </ProviderDB>,
      )
    }
  }

  hide() {
    this.root?.unmount()
  }
}
