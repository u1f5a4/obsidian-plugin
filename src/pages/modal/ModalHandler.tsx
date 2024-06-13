import { CalendarEvent } from "@/entities/event";
import { useRxData } from "rxdb-hooks";

export const ModalHandler = ({ type, id }: { type: string; id: string }) => {
  const { result: event, isFetching } = useRxData<CalendarEvent>(
    "events",
    collection =>
      collection.findOne({
        selector: {
          id: id,
        },
      }),
  );

  if (isFetching) return "loading...";

  return (
    <div>
      <h1>Modal</h1>
      <p>
        {JSON.stringify(event, null, 2)}
      </p>
    </div>
  );
};
