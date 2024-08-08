import { useState } from "react";
import EventCard from "./EventCard";

interface EventCardProps {
  isPositionReq: boolean;
  position?: number;
  indexNumber: number;
  eventList: any;
}

const EventsGrouped = ({
  isPositionReq,
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
            top: `${isPositionReq && position ? position : 0 + 64}px`,
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
                  isPositionReq={false}
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
            top: `${isPositionReq && position}px`,
          }}
          key={indexNumber}
          onClick={() => {
            setShowMore((prev) => !prev);
          }}
        >
          <div className="event-count">
            <p>{eventList.length}</p>
          </div>
          <p>{eventList.length} are events available</p>
        </button>
      )}
    </>
  );
};
export default EventsGrouped;
