import { randomUUID } from "crypto"
import { RxCollection } from "rxdb"

import { database } from "@/app/rxdb"

import { RemoteEvent } from ".."

export async function createRemoteEvent(entity: Omit<RemoteEvent, "id">) {
  const collection: RxCollection<RemoteEvent> = database.getCollection("remote-events")

  return await collection?.insert({
    id: randomUUID(),
    ...entity,
  })
}
