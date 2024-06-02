import fs from "fs/promises";
import path from "path";

import { SOURCE } from "./constants.js";

copyCss();
export async function copyCss() {
  const pathMain = path.join(SOURCE, "main.css");
  const pathStyles = path.join(SOURCE, "styles.css");

  const isExistMain = await fileExists(pathMain);
  if (!isExistMain) return;

  await fs.rename(pathMain, pathStyles);

  if (isExistMain) throw new Error("Failed to copy css");
}

async function fileExists(path) {
  try {
    await fs.access(path);
    return true;
  } catch (error) {
    return false;
  }
}
