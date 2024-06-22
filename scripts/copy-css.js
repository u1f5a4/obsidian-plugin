import fs from "fs/promises"
import path from "path"

import { SOURCE } from "./constants.js"

export async function copyCss() {
  const pathMain = path.join(SOURCE, "main.css")
  const pathStyles = path.join(SOURCE, "styles.css")

  const isExistMain = await fileExists(pathMain)
  if (!isExistMain) return

  await fs.rename(pathMain, pathStyles)

  setTimeout(async () => {
    const isExistMain = await fileExists(pathMain)
    if (isExistMain) throw new Error("Failed to copy css")
  }, 1000)
}

async function fileExists(path) {
  try {
    await fs.access(path)
    return true
  } catch (error) {
    return false
  }
}
