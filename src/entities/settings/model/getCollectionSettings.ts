import { RxCollection } from "rxdb"

import { database } from "@/app/rxdb"

import { Settings } from ".."

export const getCollectionSettings = (): RxCollection<Settings> => database.getCollection("settings")
