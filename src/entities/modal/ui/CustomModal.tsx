import { App, Modal } from "obsidian"
import { ReactElement, StrictMode } from "react"
import { createRoot, Root } from "react-dom/client"

import { ProviderDB } from "@/app/rxdb"
import { IS_DEVELOPMENT, IS_PRODUCTION } from "@/shared/constants"

export class CustomModal extends Modal {
  root: Root | null = null

  constructor(app: App) {
    super(app)
  }

  onOpen() {
  }

  onClose() {
    this.root?.unmount()
  }

  customOpen(children: ReactElement) {
    this.open()

    this.root = createRoot(this.containerEl.children[1])

    if (IS_PRODUCTION) {
      this.root.render(
        <StrictMode>
          <ProviderDB>
            {children}
          </ProviderDB>
        </StrictMode>,
      )
    }

    if (IS_DEVELOPMENT) {
      this.root.render(
        <ProviderDB>
          {children}
        </ProviderDB>,
      )
    }
  }
}
