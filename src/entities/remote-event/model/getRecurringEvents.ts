import { add, Duration, sub } from "date-fns"
// @ts-ignore this lib is not typed
import ICAL from "ical.js"

export function getRecurringEvents(component: ICAL.Component, durationDate: Duration) {
  const vevents = component.getAllSubcomponents("vevent")
  const eventMap = new Map<string, ICAL.Component>()

  vevents.forEach((veventComponent: any) => {
    const vevent = new ICAL.Event(veventComponent)
    const tzid = veventComponent.getFirstProperty("dtstart").getParameter("tzid")

    if (vevent.isRecurring()) {
      handleRecurringEvent(vevent, tzid, eventMap, durationDate)
    } else {
      handleSingleEvent(vevent, veventComponent, eventMap, durationDate)
    }
  })

  return Array.from(eventMap.values())
}

function handleSingleEvent(
  vevent: ICAL.Event,
  veventComponent: ICAL.Component,
  eventMap: Map<string, ICAL.Component>,
  durationDate: Duration,
) {
  const uniqueKey = generateUniqueKey(vevent)
  if (eventMap.has(uniqueKey)) return

  const after = ICAL.Time.fromJSDate(add(new Date(), durationDate), true)
  const before = ICAL.Time.fromJSDate(sub(new Date(), durationDate), true)
  if (vevent.startDate.compare(before) <= 0) return
  if (vevent.endDate.compare(after) >= 0) return

  eventMap.set(uniqueKey, veventComponent)
}

function handleRecurringEvent(
  vevent: ICAL.Event,
  tzid: string,
  eventMap: Map<string, ICAL.Component>,
  durationDate: Duration,
) {
  const start = vevent.startDate
  const end = vevent.endDate
  const duration = end.subtractDate(start)
  const recur = vevent.iterator()
  const after = ICAL.Time.fromJSDate(add(new Date(), durationDate), true)
  const before = ICAL.Time.fromJSDate(sub(new Date(), durationDate), true)

  let next
  while ((next = recur.next()) && next.compare(after) < 0) {
    if (next.compare(before) <= 0) continue

    const newEvent = createNewEvent(vevent, next, duration, tzid)
    const uniqueKey = generateUniqueKey(newEvent)

    if (eventMap.has(uniqueKey)) continue

    eventMap.set(uniqueKey, newEvent.component)
  }
}

function createNewEvent(
  vevent: ICAL.Event,
  next: ICAL.Time,
  duration: ICAL.Duration,
  tzid: string,
): ICAL.Event {
  const occurrence = new ICAL.Component("vevent")
  const newEvent = new ICAL.Event(occurrence)

  newEvent.summary = vevent.summary || ""
  newEvent.description = vevent.description || ""
  newEvent.location = vevent.location || ""

  if (next && vevent.startDate.zone) {
    newEvent.startDate = next.clone()
    const endDate = next.clone()
    endDate.addDuration(duration)
    newEvent.endDate = endDate
  }

  const dtstartProperty = newEvent.component.getFirstProperty("dtstart")
  dtstartProperty.setParameter("tzid", tzid)

  return newEvent
}

function generateUniqueKey(event: ICAL.Event): string {
  return `${event.startDate.toString()}-${event.summary}`
}
