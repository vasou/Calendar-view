import React from "react";
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
  console.log(eventsList);
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
    </div>
  );
}
