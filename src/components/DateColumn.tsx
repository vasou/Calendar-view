import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import EventCard from "./EventCard";

interface eventType {
  id: number;
  summary: string;
  desc: string;
  start: string;
  end: string;
  attendees: string;
  status: null;
  comment: null;
  //   score: { zsdf: number; asdf?: undefined; SF?: undefined; asf?: undefined };
  link: string;
}

interface DateColumnProps {
  datesCount: Date;
  eventsList: any[];
  columnKey: number;
}

export default function DateColumn({
  datesCount,
  eventsList,
  columnKey,
}: DateColumnProps) {
  const [columnEvent, setColumnEvent] = useState<eventType[]>([]);

  useEffect(() => {
    findColumnEvent();
  }, [eventsList]);

  const findColumnEvent = () => {
    const data = eventsList.filter(
      (item) => format(item.start, "HH") === format(datesCount, "HH")
    );
    console.log(data);
    setColumnEvent(data);
  };
  console.log(columnEvent);

  return (
    <div className="day-wrapper" key={columnKey}>
      {eventsList.map((event, index) => {
        const position = parseInt(format(event.start, "H")) * 56;
        return (
          <>
            {format(datesCount, "dd/MM/yyyy") ===
              format(event.start, "dd/MM/yyyy") && (
              <EventCard
                position={position}
                indexNumber={index}
                eventList={event}
              />
            )}
          </>
        );
      })}
      {columnEvent &&
        columnEvent.map((event, index) => {
          return (
            <>
              <p>{event.start}</p>
              <p>{event.end}</p>
            </>
          );
        })}
    </div>
  );
}
