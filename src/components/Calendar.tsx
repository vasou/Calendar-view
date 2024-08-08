"use client";
import "./styles/calendar.css";
import { CalendarView } from "../userdata/calendar";
import { useEffect, useState } from "react";
import {
  endOfWeek,
  startOfToday,
  startOfWeek,
  eachDayOfInterval,
  addDays,
  startOfMonth,
} from "date-fns";
import TopBar from "./TopBar";
import NavBar from "./NavBar";
import CalendarColumns from "./CalendarColumns";
import CalendarHeader from "./CalendarHeader";
import WeekRowList from "./WeekRowList";

export default function Calendar() {
  const today = startOfToday();
  const [view, setView] = useState("Week");
  const [viewValue, setViewValue] = useState(0);
  const [dates, setDates] = useState([startOfWeek(today), endOfWeek(today)]);
  const [clickCount, setClickCount] = useState(0);
  const [clickCountMonth, setClickCountMonth] = useState(0);
  const [isTodayActive, SetIsTodayActive] = useState(true);

  const weekStarts = startOfWeek(today, { weekStartsOn: 0 });
  const weekEnds = endOfWeek(today, { weekStartsOn: 0 });

  const monthStarts = startOfMonth(new Date());
  // const monthEnds = endOfMonth(new Date());

  useEffect(() => {
    FindViewValue(view);
  }, [viewValue]);

  useEffect(() => {
    // showThisWeek();
    // showThisMonth();
  }, []);

  const FindViewValue = (view: string) => {
    switch (view) {
      case "Day": {
        return setViewValue(CalendarView[0].columns);
      }
      case "Week": {
        showThisWeek();
        return setViewValue(CalendarView[1].columns);
      }
      case "Month": {
        showThisMonth();
        return setViewValue(CalendarView[2].columns);
      }
      case "Year": {
        return setViewValue(CalendarView[3].columns);
      }
      default:
        setViewValue(CalendarView[1].columns);
    }
  };

  const handleView = (name: string) => {
    setView(name);
    FindViewValue(name);
  };

  // Week functionality
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

  // Month functionality
  const showThisMonth = () => {
    const daysOfMonth = eachDayOfInterval({
      start: startOfWeek(monthStarts, { weekStartsOn: 0 }),
      end: addDays(startOfWeek(monthStarts, { weekStartsOn: 0 }), 34),
    });
    setDates(daysOfMonth);
    SetIsTodayActive(true);
  };
  const showPrevMonth = () => {
    const counter = clickCountMonth - 34;
    const tempStart = addDays(dates[0], -34);
    const daysOfMonth = eachDayOfInterval({
      start: tempStart,
      end: addDays(tempStart, 34),
    });
    setClickCountMonth(counter);
    setDates(daysOfMonth);
    SetIsTodayActive(false);
  };
  const showNextMonth = () => {
    const counter = clickCount + 34;
    const tempStart = addDays(dates[0], 34);
    const daysOfMonth = eachDayOfInterval({
      start: tempStart,
      end: addDays(tempStart, 34),
    });
    setClickCountMonth(counter);
    setDates(daysOfMonth);
    SetIsTodayActive(false);
  };
  return (
    <div className="calendar-wrap">
      <TopBar />
      <NavBar
        view={view}
        handleView={handleView}
        isTodayActive={isTodayActive}
        showPrevWeek={showPrevWeek}
        showThisWeek={showThisWeek}
        showNextWeek={showNextWeek}
        showPrevMonth={showPrevMonth}
        showThisMonth={showThisMonth}
        showNextMonth={showNextMonth}
      />
      <div className="calendar-group-wrap">
        <div className="calendar-group">
          <CalendarHeader dates={dates} view={view} />
          <CalendarColumns dates={dates} view={view} />
          {view === "Day" && <WeekRowList />}
          {view === "Week" && <WeekRowList />}
          {view === "Year" && <WeekRowList />}
        </div>
      </div>
    </div>
  );
}
