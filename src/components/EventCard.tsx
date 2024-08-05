import React from "react";
import { format } from "date-fns";

type eventType = {
  id: number;
  summary: string;
  desc: string;
  start: string;
  end: string;
  attendees: string;
  status: null;
  comment: null;
  link: string;
};

interface EventCardProps {
  position: number;
  indexNumber: number;
  eventList: any;
}
const EventCard = ({ position, indexNumber, eventList }: EventCardProps) => {
  // console.log(eventList);
  return (
    <>
      <div
        className="event-card"
        style={{
          top: `${position}px`,
        }}
        key={indexNumber}
      >
        <p>{eventList.summary}</p>
        <p>
          {format(eventList.start, "hh aaa")} -{" "}
          {format(eventList.end, "hh aaa")}
        </p>
      </div>
    </>
  );
};

export default EventCard;
