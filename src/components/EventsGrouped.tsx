import React, { useState } from "react";
import { format } from "date-fns";
import EventCard from "./EventCard";

interface EventCardProps {
  position: number;
  indexNumber: number;
  eventList: any;
}

const EventsGrouped = ({
  position,
  indexNumber,
  eventList,
}: EventCardProps) => {
  console.log(eventList);
  const [showMore, setShowMore] = useState(false);
  return (
    <>
      {showMore ? (
        <div
          className="event-group-wrap"
          style={{
            top: `${position + 64}px`,
          }}
        >
          <div
            className="event-group-layer"
            onClick={() => {
              setShowMore((prev) => !prev);
            }}
          ></div>
          {eventList &&
            eventList.map((item: any, index: number) => {
              return (
                <EventCard
                  indexNumber={index}
                  eventList={item}
                  displayAsList={true}
                />
              );
            })}
        </div>
      ) : (
        <button
          className="event-card"
          style={{
            top: `${position}px`,
          }}
          key={indexNumber}
          onClick={() => {
            setShowMore((prev) => !prev);
          }}
        >
          <p>{eventList.length} are events available</p>
        </button>
      )}
    </>
  );
};
export default EventsGrouped;
