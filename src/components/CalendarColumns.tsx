import React from "react";
import { useEffect, useState } from "react";
import DateColumn from "./DateColumn";
import { format } from "date-fns";
type eventType = {
  id: number;
  summary: string;
  start: string;
  end: string;
};

interface CalendarColumnsProps {
  dates: Date[];
  view: string;
}

const CalendarColumns = ({ dates, view }: CalendarColumnsProps) => {
  const [eventsList, setEventsList] = useState<eventType[]>([]);
  useEffect(() => {
    handleGetEvents();
  }, [dates]);

  const handleGetEvents = async () => {
    try {
      fetch(
        `${import.meta.env.VITE_EVENTS_API}?from_date=${format(
          dates[0],
          "yyyy-MM-dd"
        )}&to_date=${format(dates[dates.length - 1], "yyy-MM-dd")}`
      )
        .then((res) => res.json())
        .then((data) => {
          setEventsList(data);
        });
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log("Event list from Calendar columns comp", eventsList);
  return (
    <div className={`event-list-wrap ${view === "Month" ? "!relative" : ""}`}>
      {view === "Day" && (
        <div className="event-list-blk">
          <div className="timeslots"></div>
          <>
            {dates.map((dateList, index) => {
              return (
                <DateColumn
                  datesCount={dateList}
                  eventsList={eventsList}
                  key={index}
                  columnKey={index}
                  view={view}
                />
              );
            })}
          </>
        </div>
      )}
      {view === "Week" && (
        <div className="event-list-blk">
          <div className="timeslots"></div>
          <>
            {dates.map((dateList, index) => {
              return (
                <DateColumn
                  datesCount={dateList}
                  eventsList={eventsList}
                  key={index}
                  columnKey={index}
                  view={view}
                />
              );
            })}
          </>
        </div>
      )}
      {view === "Month" && (
        <div className="event-list-blk month">
          <>
            {dates.map((dateList, index) => {
              return (
                <React.Fragment key={index}>
                  <DateColumn
                    datesCount={dateList}
                    eventsList={eventsList}
                    key={index}
                    columnKey={index}
                    view={view}
                  />
                </React.Fragment>
              );
            })}
          </>
        </div>
      )}
      {view === "Year" && (
        <div className="event-list-blk">
          <div className="timeslots"></div>
          <>
            {/* {dates.map((dateList, index) => {
              return (
                <DateColumn
                  datesCount={dateList}
                  eventsList={eventsList}
                  key={index}
                  columnKey={index}
                  view={view}
                />
              );
            })} */}
          </>
        </div>
      )}
    </div>
  );
};
export default CalendarColumns;
