import { formatDuration, intervalToDuration } from "date-fns"
import { useRxData } from "rxdb-hooks"

import { CalendarEvent, deleteEvent } from "@/entities/event"
import { modalView } from "@/entities/modal"
import { EventEditForm } from "../../event-edit-form"

import "./style.scss"

export interface ReadProps {
  eventClickId: string
}

export const EventRead = ({ eventClickId }: ReadProps) => {
  const { result, isFetching } = useRxData<CalendarEvent>(
    "events",
    collection => collection.findOne({ selector: { id: eventClickId } }),
  )

  const event = result[0]

  if (isFetching) return <div>Loading...</div>

  if (!event) return <div>No event</div>

  const getDuration = () => {
    const duration = intervalToDuration({
      start: new Date(event.start),
      end: new Date(event.end),
    })

    return formatDuration(duration)
  }

  const handleDeleteEvent = async () => {
    await deleteEvent(event.id)
    modalView.close()
  }

  const handleEditEvent = async () => {
    modalView.open(<EventEditForm eventId={event.id} />)
  }

  return (
    <div className="event-read">
      <h1>Read</h1>

      <label>
        Title:
      </label>
      <p>{event.title}</p>

      <label>
        Duration:
      </label>
      <p>{getDuration()}</p>

      <div>
        <label>
          Start:
        </label>
        <p>{event.start}</p>
      </div>

      <div>
        <label>
          End:
        </label>
        <p>{event.end}</p>
      </div>

      <div>
        <label>
          Calendar:
        </label>
        <p>{event.calendarId}</p>
      </div>

      <div>
        <button onClick={handleDeleteEvent}>Delete</button>
        <button onClick={handleEditEvent}>Edit</button>
      </div>
    </div>
  )
}
