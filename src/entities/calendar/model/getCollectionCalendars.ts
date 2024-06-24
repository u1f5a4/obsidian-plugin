import { RxCollection } from "rxdb"

import { database } from "@/app/rxdb"

import { Calendar } from ".."

export const getCollectionCalendars = (): RxCollection<Calendar> => database.getCollection("calendars")
