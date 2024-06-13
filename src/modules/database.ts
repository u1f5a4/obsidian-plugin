import { addRxPlugin, createRxDatabase, RxCollection, RxDatabase } from "rxdb";
import { disableWarnings, RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { RxDBJsonDumpPlugin } from "rxdb/plugins/json-dump";
import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { RxDBUpdatePlugin } from "rxdb/plugins/update";

import { IS_DEVELOPMENT } from "@/app/constants";
import { eventSchema } from "@/entities/event";
import { type TodoDocumentType, todoSchema } from "@/entities/todo";
import { CalendarEvent } from "@schedule-x/shared";

export interface Collections {
  todos: RxCollection<TodoDocumentType>;
  events: RxCollection<CalendarEvent>;
}

class Database {
  private myDatabase: any;

  constructor() {
    this.init();
  }

  private async init() {
    if (IS_DEVELOPMENT) {
      disableWarnings();
      addRxPlugin(RxDBDevModePlugin);
    }

    addRxPlugin(RxDBQueryBuilderPlugin);
    addRxPlugin(RxDBUpdatePlugin);
    addRxPlugin(RxDBJsonDumpPlugin);

    const myDatabase: RxDatabase<Collections> = await createRxDatabase({
      name: "test",
      storage: getRxStorageDexie(),
      ignoreDuplicate: true,
    });

    await myDatabase.addCollections({
      todos: {
        schema: todoSchema,
      },
      events: {
        schema: eventSchema,
      },
    });

    this.myDatabase = myDatabase;
  }

  public getDatabase() {
    return this.myDatabase;
  }

  public getCollection(name: keyof Collections) {
    return this.myDatabase?.[name];
  }
}

export default new Database();
