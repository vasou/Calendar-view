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
} from "date-fns";

export default function Calendar() {
  const [view, setView] = useState("Week");
  const [viewValue, setViewValue] = useState(0);
  const [dates, setDates] = useState([new Date()]);

  const today = startOfToday();

  useEffect(() => {
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

    FindViewValue(view);
  }, []);

  useEffect(() => {
    const weekStarts = startOfWeek(today);
    const weekEnds = endOfWeek(today);
    const daysOfWeek = eachDayOfInterval({ start: weekStarts, end: weekEnds });
    setDates(daysOfWeek);
  }, []);

  return (
    <div className="calendar-wrap">
      {/* Top bar block */}
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
          <button className="icon-btn">
            <LeftArrow />
          </button>
          <button className="icon-btn">
            <RightArrow />
          </button>
        </div>
        <div className="flex gap-8">
          {CalendarView.map((list, index) => {
            return (
              <button className="nav-link" key={index}>
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
