import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import EventCard from "./EventCard";
import EventsGrouped from "./EventsGrouped";

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
  const [events, setEvents] = useState<eventType[]>([]);

  useEffect(() => {
    // findColumnEvent();
    setEvents(eventsList);
  }, [eventsList]);

  const findAndRemoveDuplicates = (
    events: eventType[]
  ): { uniqueEvents: eventType[]; duplicates: eventType[] } => {
    const eventMap = new Map<string, eventType[]>();
    const duplicates: eventType[] = [];

    events.forEach((event) => {
      const eventKey = `${event.start}-${event.end}`;
      if (eventMap.has(eventKey)) {
        eventMap.get(eventKey)!.push(event);
      } else {
        eventMap.set(eventKey, [event]);
      }
    });

    eventMap.forEach((eventList) => {
      if (eventList.length > 1) {
        duplicates.push(...eventList);
      }
    });

    const uniqueEvents = events.filter((event) => !duplicates.includes(event));

    return { uniqueEvents, duplicates };
  };

  const { uniqueEvents, duplicates } = findAndRemoveDuplicates(events);
  //   console.log("unique events", uniqueEvents);
  //   console.log("duplicates events", duplicates);

  return (
    <div className="day-wrapper" key={columnKey}>
      {uniqueEvents.map((event, index) => {
        const position = parseInt(format(event.start, "H")) * 56;
        return (
          <>
            {format(datesCount, "dd/MM/yyyy") ===
              format(event.start, "dd/MM/yyyy") && (
              <EventCard
                position={position}
                indexNumber={index}
                eventList={event}
                displayAsList={false}
              />
            )}
          </>
        );
      })}
      {duplicates.map((event, index) => {
        const position = parseInt(format(event.start, "H")) * 56;
        return (
          <>
            {format(datesCount, "dd/MM/yyyy") ===
              format(event.start, "dd/MM/yyyy") && (
              <EventsGrouped
                position={position}
                indexNumber={index}
                eventList={duplicates}
              />
            )}
          </>
        );
      })}
    </div>
  );
}
