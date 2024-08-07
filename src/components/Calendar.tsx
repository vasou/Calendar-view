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
} from "date-fns";
import TopBar from "./TopBar";
import NavBar from "./NavBar";
import CalendarColumns from "./CalendarColumns";
import TimebarList from "./TimebarList";
import CalendarHeader from "./CalendarHeader";

export default function Calendar() {
  const today = startOfToday();
  const [view] = useState("Week");
  const [viewValue, setViewValue] = useState(0);
  const [dates, setDates] = useState([startOfWeek(today), endOfWeek(today)]);
  const [clickCount, setClickCount] = useState(0);
  const [isTodayActive, SetIsTodayActive] = useState(true);

  const weekStarts = startOfWeek(today, { weekStartsOn: 0 });
  const weekEnds = endOfWeek(today, { weekStartsOn: 0 });

  useEffect(() => {
    FindViewValue(view);
  }, [viewValue]);

  useEffect(() => {
    showThisWeek();
  }, []);

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
      <TopBar />
      <NavBar
        view={view}
        isTodayActive={isTodayActive}
        showPrevWeek={showPrevWeek}
        showThisWeek={showThisWeek}
        showNextWeek={showNextWeek}
      />
      <div className="calendaer-group-wrap">
        <div className="calendar-group">
          <CalendarHeader dates={dates} />
          <CalendarColumns dates={dates} />
          <TimebarList />
        </div>
      </div>
    </div>
  );
}
