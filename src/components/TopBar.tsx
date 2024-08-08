import { useState } from "react";
import { format, startOfToday } from "date-fns";
import { Months, Years } from "../userdata/calendar";

export default function TopBar() {
  const [selectMonth, setSelectMonth] = useState(
    format(startOfToday(), "LLLL")
  );
  const [selectYear, setSelectYear] = useState(format(startOfToday(), "y"));
  return (
    <div className="top-bar">
      <h2>Your Todo's</h2>
      <div className="flex gap-4">
        <select
          value={selectMonth}
          onChange={(e) => setSelectMonth(e.target.value)}
          disabled
        >
          {Months.map((list, index) => {
            return (
              <option key={index} value={list}>
                {list}
              </option>
            );
          })}
        </select>
        <select
          value={selectYear}
          onChange={(e) => setSelectYear(e.target.value)}
          disabled
        >
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
  );
}
