// @ts-ignore
import ICAL from "ical.js"
import { flow } from "lodash"

export async function fetchRemoteCalendar(url: string) {
  const proxyUrl = "https://corsproxy.io/?"

  const response = await fetch(proxyUrl + url, {
    method: "GET",
  })

  const calendarData = await response.text()

  return flow(
    () => calendarData,
    (d) => ICAL.parse(d),
    (d) => new ICAL.Component(d),
  )()
}
