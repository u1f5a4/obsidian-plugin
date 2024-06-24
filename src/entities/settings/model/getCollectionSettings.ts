import { RxCollection } from "rxdb"

import { database } from "@/app/model/rxdb"

import { Settings } from ".."

export const getCollectionSettings = (): RxCollection<Settings> => database.getCollection("settings")
