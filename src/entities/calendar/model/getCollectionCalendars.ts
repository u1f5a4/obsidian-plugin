import { RxCollection } from "rxdb"

import { database } from "@/app/model/rxdb"

import { CalendarEntity } from ".."

export const getCollectionCalendars = (): RxCollection<CalendarEntity> => database.getCollection("calendars")
