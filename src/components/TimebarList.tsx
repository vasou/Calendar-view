import { Timeslots } from "../userdata/calendar";

export default function TimebarList() {
  return (
    <div className="calendar-list">
      <div className="timeslots">
        {Timeslots.map((time, index) => {
          return (
            <div key={index} className="one-hr-block">
              <span>{time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
