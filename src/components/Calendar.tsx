"use client";
import "./styles/calendar.css";
import { Months, Years, CalendarView, Timeslots } from "../userdata/calendar";
import LeftArrow from "../assets/LeftArrow";
import RightArrow from "../assets/RightArrow";
import { useEffect, useState } from "react";
import {
  endOfWeek,
  startOfToday,
  startOfWeek,
  eachDayOfInterval,
  format,
  addDays,
} from "date-fns";
import { sampleData } from "../userdata/sampleData";

type eventType = {
  id: number;
  summary: string;
};

export default function Calendar() {
  const [view, setView] = useState("Week");
  const [viewValue, setViewValue] = useState(0);
  const [dates, setDates] = useState([new Date()]);
  const [clickCount, setClickCount] = useState(0);
  const [isTodayActive, SetIsTodayActive] = useState(true);
  const [eventsList, setEventsList] = useState<eventType[]>([]);

  const today = startOfToday();
  const weekStarts = startOfWeek(today, { weekStartsOn: 0 });
  const weekEnds = endOfWeek(today, { weekStartsOn: 0 });

  useEffect(() => {
    FindViewValue(view);
  }, [viewValue]);

  useEffect(() => {
    showThisWeek();
    handleGetEvents();
  }, []);

  const handleGetEvents = async () => {
    // const data = fetch("https://jsonplaceholder.typicode.com/users")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setEventsList(data);
    //   });
  };

  const FindViewValue = (view: string) => {
    switch (view) {
      case "Today": {
        return setViewValue(CalendarView[0].columns);
      }
      case "Week": {
        return setViewValue(CalendarView[1].columns);
      }
      case "Month": {
        return setViewValue(CalendarView[2].columns);
      }
      case "Year": {
        return setViewValue(CalendarView[3].columns);
      }
      default:
        setViewValue(0);
    }
  };

  const showThisWeek = () => {
    const daysOfWeek = eachDayOfInterval({ start: weekStarts, end: weekEnds });
    setDates(daysOfWeek);
    SetIsTodayActive(true);
  };

  const showPrevWeek = () => {
    const counter = clickCount - 7;
    const daysOfWeek = eachDayOfInterval({
      start: addDays(startOfWeek(today, { weekStartsOn: 0 }), counter),
      end: addDays(endOfWeek(today, { weekStartsOn: 0 }), counter),
    });
    setClickCount(counter);
    setDates(daysOfWeek);
    SetIsTodayActive(false);
  };

  const showNextWeek = () => {
    const counter = clickCount + 7;
    const daysOfWeek = eachDayOfInterval({
      start: addDays(startOfWeek(today, { weekStartsOn: 0 }), counter),
      end: addDays(endOfWeek(today, { weekStartsOn: 0 }), counter),
    });
    setClickCount(counter);
    setDates(daysOfWeek);
    SetIsTodayActive(false);
  };
  return (
    <div className="calendar-wrap">
      {/* Top bar block */}
      <div>
        {sampleData &&
          sampleData.map((event: any, index) => {
            return (
              <div key={index}>
                <p>{event.summary}</p>
                <div>
                  <span>{event.start && format(event.start, "hh aaa")}</span> -{" "}
                  <span>{event.end && format(event.end, "hh aaa")}</span>
                </div>
              </div>
            );
          })}
      </div>
      <div className="top-bar">
        <h2>Your Todo's</h2>
        <div className="flex gap-4">
          <select>
            {Months.map((list, index) => {
              return <option key={index}>{list}</option>;
            })}
          </select>
          <select>
            {Years.map((list, index) => {
              return <option key={index}>{list}</option>;
            })}
          </select>
        </div>
      </div>
      {/* Nav bar block */}
      <div className="nav-bar">
        <div className="flex gap-2">
          <button className="icon-btn" onClick={showPrevWeek}>
            <LeftArrow />
          </button>
          <button
            className={`!px-6 icon-btn ${isTodayActive ? "active" : ""}`}
            onClick={showThisWeek}
          >
            Today
          </button>
          <button className="icon-btn" onClick={showNextWeek}>
            <RightArrow />
          </button>
        </div>
        <div className="flex gap-8">
          {CalendarView.map((list, index) => {
            return (
              <button
                className={`nav-link ${list.name === view ? "active" : ""}`}
                key={index}
              >
                {list.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="calendar-group">
        {/* Calendar header */}
        <div className="calendar-header">
          <div className="timeslots"></div>
          <>
            {dates &&
              dates.map((item, index) => {
                return (
                  <div className="day-wrapper" key={index}>
                    <div className="flex flex-col justify-center items-center gap-2 h-full">
                      {format(item, "d MMM") === format(today, "d MMM") ? (
                        <p className="text-blue-700">{format(item, "d MMM")}</p>
                      ) : (
                        <p>{format(item, "d MMM")}</p>
                      )}

                      <p>{format(item, "EEE")}</p>
                    </div>
                  </div>
                );
              })}
          </>
        </div>
        {/* Calendar data block */}
        <div className="event-list-wrap">
          <div className="event-list-blk">
            <div className="timeslots"></div>
            <>
              {[...Array(viewValue)].map((_, index) => {
                return (
                  <div className="day-wrapper" key={index}>
                    <div className="event-card">
                      <p>Title</p>
                    </div>
                  </div>
                );
              })}
            </>
          </div>
        </div>
        {/* Calendar list */}
        <div className="calendar-list">
          <div className="timeslots">
            {Timeslots.map((time, index) => {
              return (
                <div key={index} className="one-hr-block !border-0">
                  <span>{time}</span>
                </div>
              );
            })}
          </div>
          <>
            {[...Array(viewValue)].map((_, index) => {
              return (
                <div className="day-wrapper" key={index}>
                  {Timeslots.map((_, index) => {
                    return <div key={index} className="one-hr-block"></div>;
                  })}
                </div>
              );
            })}
          </>
        </div>
      </div>
    </div>
  );
}
