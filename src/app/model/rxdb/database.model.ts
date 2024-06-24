import { addRxPlugin, createRxDatabase, RxCollection, RxDatabase, RxState } from "rxdb"
import { disableWarnings, RxDBDevModePlugin } from "rxdb/plugins/dev-mode"
import { RxDBJsonDumpPlugin } from "rxdb/plugins/json-dump"
import { RxDBLocalDocumentsPlugin } from "rxdb/plugins/local-documents"
import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder"
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie"
import { RxDBUpdatePlugin } from "rxdb/plugins/update"

import { addDefaultCalendar, type Calendar, schemaCalendar } from "@/entities/calendar"
import { type CalendarEvent, schemaEvent } from "@/entities/event"
import { createDefaultSettings, schemaSettings, type Settings } from "@/entities/settings"

import { IS_DEVELOPMENT } from "@/constants"
import { StateDB } from "./state.model"

export interface Collections {
  events: RxCollection<CalendarEvent>
  calendars: RxCollection<Calendar>
  settings: RxCollection<Settings>
}

class Database {
  private myDatabase: any
  private myState: StateDB

  async init() {
    if (IS_DEVELOPMENT) {
      disableWarnings()
      addRxPlugin(RxDBDevModePlugin)
    }

    addRxPlugin(RxDBQueryBuilderPlugin)
    addRxPlugin(RxDBUpdatePlugin)
    addRxPlugin(RxDBJsonDumpPlugin)
    addRxPlugin(RxDBLocalDocumentsPlugin)

    // How disable warnings?
    // move "node_modules/rxdb/dist/esm/plugins/storage-dexie/rx-storage-instance-dexie.js" to comment out line 30
    const myDatabase: RxDatabase<Collections> = await createRxDatabase({
      name: "test",
      storage: getRxStorageDexie(),
      localDocuments: true,
    })

    await myDatabase.addCollections({
      events: {
        schema: schemaEvent,
      },
      calendars: {
        schema: schemaCalendar,
      },
      settings: {
        schema: schemaSettings,
      },
    })

    this.myDatabase = myDatabase

    this.myState = await new StateDB(myDatabase).init()

    await this.handleFirstLaunch()
  }

  private async handleFirstLaunch() {
    const isFirstLaunch = await this.myState.get("isFirstLaunch")

    if (!isFirstLaunch) return

    await addDefaultCalendar()
    await createDefaultSettings()

    await this.myState.set("isFirstLaunch", false)
  }

  public getDatabase() {
    return this.myDatabase
  }

  public getCollection(name: keyof Collections) {
    return this.myDatabase?.[name]
  }
}

export const database = new Database()
