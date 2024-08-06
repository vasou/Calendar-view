import { useState } from "react";
import { format } from "date-fns";
import EventPopup from "./EventPopup";

// type eventType = {
//   id: number;
//   summary: string;
//   desc: string;
//   start: string;
//   end: string;
//   attendees: string;
//   status: null;
//   comment: null;
//   link: string;
// };

interface EventCardProps {
  position?: number;
  indexNumber: number;
  eventList: any;
  displayAsList: boolean;
}
const EventCard = ({
  position,
  indexNumber,
  eventList,
  displayAsList,
}: EventCardProps) => {
  const [popup, setPopup] = useState(false);
  return (
    <>
      <button
        className={`event-card ${displayAsList ? "!relative !w-full" : ""}`}
        style={{
          top: `${position}px`,
        }}
        key={indexNumber}
        onClick={() => setPopup((prev) => !prev)}
      >
        <p>{eventList.summary}</p>
        <p>
          {format(eventList.start, "hh aaa")} -{" "}
          {format(eventList.end, "hh aaa")}
        </p>
      </button>
      {popup && (
        <EventPopup
          popupToggle={popup}
          eventList={eventList}
          handlePopup={() => setPopup((prev) => !prev)}
        />
      )}
    </>
  );
};

export default EventCard;
