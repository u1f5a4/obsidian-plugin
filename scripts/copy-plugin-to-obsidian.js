import fs from "fs/promises";

import { DESTINATION, SOURCE, TIME_BUILD } from "./constants.js";
import { copyCss } from "./copy-css.js";

main();
async function main() {
  await delay(TIME_BUILD);
  await copyCss();
  const files = await getFiles(SOURCE);
  for (let i = 0; i < files.length; i++) {
    const sourceFile = `${SOURCE}${files[i]}`;
    const destinationFile = `${DESTINATION}${files[i]}`;
    await copyFile(sourceFile, destinationFile);
  }
}

async function copyFile(source, destination) {
  try {
    await fs.copyFile(source, destination);
  } catch (err) {
    console.error("Error copying file:", err);
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getFiles(dirPath) {
  const files = await fs.readdir(dirPath);
  let allFiles = [];
  for (let i = 0; i < files.length; i++) {
    const filePath = `${dirPath}/${files[i]}`;
    if ((await fs.stat(filePath)).isFile()) {
      allFiles.push(files[i]);
    }
  }
  return allFiles;
}
