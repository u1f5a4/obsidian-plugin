import { addRxPlugin, createRxDatabase, RxCollection, RxDatabase } from "rxdb";
import { disableWarnings, RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { RxDBUpdatePlugin } from "rxdb/plugins/update";

import { IS_DEVELOPMENT } from "@/app/constants";
import { type TodoDocumentType, todoSchema } from "@/entities/todo";

export interface Collections {
  todos: RxCollection<TodoDocumentType>;
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

    const myDatabase: RxDatabase<Collections> = await createRxDatabase({
      name: "test",
      storage: getRxStorageDexie(),
      ignoreDuplicate: true,
    });

    await myDatabase.addCollections({
      todos: {
        schema: todoSchema,
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
