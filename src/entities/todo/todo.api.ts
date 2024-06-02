import { randomUUID } from "crypto";

import Database from "@/modules/database";
import { RxJsonSchema } from "rxdb";

export type TodoDocumentType = {
  id: string;
  name: string;
  done: boolean;
  timestamp: string;
};

export const todoSchema: RxJsonSchema<TodoDocumentType> = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 32,
    },
    name: {
      type: "string",
    },
    done: {
      type: "boolean",
    },
    timestamp: {
      type: "string",
      format: "date-time",
    },
  },
  required: ["name", "done", "timestamp"],
};

export async function createTodo(entity: Omit<TodoDocumentType, "id">) {
  const collection = Database.getCollection("todos");

  return await collection?.insert({
    id: randomUUID(),
    ...entity,
  });
}
