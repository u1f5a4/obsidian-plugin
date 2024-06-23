import { CalendarEvent } from "@schedule-x/shared"
import { addRxPlugin, createRxDatabase, RxCollection, RxDatabase } from "rxdb"
import { disableWarnings, RxDBDevModePlugin } from "rxdb/plugins/dev-mode"
import { RxDBJsonDumpPlugin } from "rxdb/plugins/json-dump"
import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder"
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie"
import { RxDBUpdatePlugin } from "rxdb/plugins/update"

import { IS_DEVELOPMENT } from "@/constants"
import { addDefaultCalendar, CalendarEntity, calendarSchema } from "@/entities/calendar"
import { eventSchema } from "@/entities/event"

export interface Collections {
  events: RxCollection<CalendarEvent>
  calendars: RxCollection<CalendarEntity>
}

class Database {
  private myDatabase: any

  constructor() {
  }

  async init() {
    if (IS_DEVELOPMENT) {
      disableWarnings()
      addRxPlugin(RxDBDevModePlugin)
    }

    addRxPlugin(RxDBQueryBuilderPlugin)
    addRxPlugin(RxDBUpdatePlugin)
    addRxPlugin(RxDBJsonDumpPlugin)

    // How disable warnings?
    // move "node_modules/rxdb/dist/esm/plugins/storage-dexie/rx-storage-instance-dexie.js" to comment out line 30
    const myDatabase: RxDatabase<Collections> = await createRxDatabase({
      name: "test",
      storage: getRxStorageDexie(),
      ignoreDuplicate: true,
    })

    await myDatabase.addCollections({
      events: {
        schema: eventSchema,
      },
      calendars: {
        schema: calendarSchema,
      },
    })

    this.myDatabase = myDatabase

    await this.enrichment()
  }

  private async enrichment() {
    await addDefaultCalendar()
  }

  public getDatabase() {
    return this.myDatabase
  }

  public getCollection(name: keyof Collections) {
    return this.myDatabase?.[name]
  }
}

export const database = new Database()
