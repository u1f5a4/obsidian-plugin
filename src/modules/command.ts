import { Editor, MarkdownView } from "obsidian";
import MyPlugin from "src/plugin";
import MyModal from "./modal";

export default class MyPluginCommand {
  plugin: MyPlugin;

  constructor(plugin: MyPlugin) {
    this.plugin = plugin;

    this.main();
  }

  main() {
    // This adds a simple command that can be triggered anywhere
    this.plugin.addCommand({
      id: "open-sample-modal-simple",
      name: "Open sample modal (simple)",
      callback: () => {
        new MyModal(this.plugin.app).open();
      },
    });

    // This adds an editor command that can perform some operation on the current editor instance
    this.plugin.addCommand({
      id: "sample-editor-command",
      name: "Sample editor command",
      editorCallback: (editor: Editor, view: MarkdownView) => {
        console.log(editor.getSelection());
        editor.replaceSelection("Sample Editor Command");
      },
    });

    // This adds a complex command that can check whether the current state of the app allows execution of the command
    this.plugin.addCommand({
      id: "open-sample-modal-complex",
      name: "Open sample modal (complex)",
      checkCallback: (checking: boolean) => {
        // Conditions to check
        const markdownView = this.plugin.app.workspace.getActiveViewOfType(MarkdownView);
        if (markdownView) {
          // If checking is true, we're simply "checking" if the command can be run.
          // If checking is false, then we want to actually perform the operation.
          if (!checking) {
            new MyModal(this.plugin.app).open();
          }

          // This command will only show up in Command Palette when the check function returns true
          return true;
        }
      },
    });
  }
}
