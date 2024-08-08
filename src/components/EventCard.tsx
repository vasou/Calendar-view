import { useState } from "react";
import { format } from "date-fns";
import EventPopup from "./EventPopup";

interface EventCardProps {
  isPositionReq: boolean;
  position?: number;
  indexNumber: number;
  eventList: any;
  displayAsList: boolean;
}
const EventCard = ({
  isPositionReq,
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
          top: `${isPositionReq && position}px`,
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
