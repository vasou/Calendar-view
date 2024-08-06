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
import DateColumn from "./DateColumn";

type eventType = {
  id: number;
  summary: string;
  start: string;
  end: string;
};

export default function Calendar() {
  const today = startOfToday();
  const [view] = useState("Week");
  const [viewValue, setViewValue] = useState(0);
  const [dates, setDates] = useState([startOfWeek(today), endOfWeek(today)]);
  const [clickCount, setClickCount] = useState(0);
  const [isTodayActive, SetIsTodayActive] = useState(true);
  const [eventsList, setEventsList] = useState<eventType[]>([]);

  const weekStarts = startOfWeek(today, { weekStartsOn: 0 });
  const weekEnds = endOfWeek(today, { weekStartsOn: 0 });

  useEffect(() => {
    FindViewValue(view);
  }, [viewValue]);

  useEffect(() => {
    showThisWeek();
  }, []);

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

  // console.log(eventsList);
  return (
    <div className="calendar-wrap">
      {/* Top bar block */}
      <div className="top-bar">
        <h2>Your Todo's</h2>
        <div className="flex gap-4">
          <select value={format(today, "LLLL")}>
            {Months.map((list, index) => {
              return (
                <option key={index} value={list}>
                  {list}
                </option>
              );
            })}
          </select>
          <select value={format(today, "y")}>
            {Years.map((list, index) => {
              return (
                <option key={index} value={list}>
                  {list}
                </option>
              );
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

                      <p className="text-gray-500">{format(item, "EEEE")}</p>
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
