import React, { useState } from "react";
import { format } from "date-fns";
import EventCard from "./EventCard";

interface EventCardProps {
  position: number;
  indexNumber: number;
  eventList: any;
  eventCount: number;
}

const EventsGrouped = ({
  position,
  indexNumber,
  eventList,
  eventCount,
}: EventCardProps) => {
  console.log(eventList);
  const [showMore, setShowMore] = useState(false);
  return (
    <>
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
        <p>{eventCount}</p>
      </button>
      {showMore && (
        <div>
          {/* {eventList &&
            eventList.map(() => {
              return (
                <EventCard
                  position={position}
                  indexNumber={indexNumber}
                  eventList={eventList}
                />
              );
            })} */}
        </div>
      )}
    </>
  );
};
export default EventsGrouped;
