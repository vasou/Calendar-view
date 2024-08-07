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
}

const CalendarColumns = ({ dates }: CalendarColumnsProps) => {
  const [eventsList, setEventsList] = useState<eventType[]>([]);
  useEffect(() => {
    handleGetEvents();
  }, [dates]);

  const handleGetEvents = async () => {
    // http://52.35.66.255:8000/calendar_app/api/calendar?from_date=2024-01-01&to_date=2024-08-30
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
  return (
    <div className="event-list-wrap">
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
              />
            );
          })}
        </>
      </div>
    </div>
  );
};
export default CalendarColumns;
