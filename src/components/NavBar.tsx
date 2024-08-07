import { CalendarView } from "../userdata/calendar";
import LeftArrow from "../assets/LeftArrow";
import RightArrow from "../assets/RightArrow";

interface NavBarProps {
  view: string;
  handleView: (name: string) => void;
  isTodayActive: boolean;
  showPrevWeek: () => void;
  showThisWeek: () => void;
  showNextWeek: () => void;
  showPrevMonth: () => void;
  showThisMonth: () => void;
  showNextMonth: () => void;
}

const NavBar = ({
  view,
  handleView,
  isTodayActive,
  showPrevWeek,
  showThisWeek,
  showNextWeek,
  showPrevMonth,
  showThisMonth,
  showNextMonth,
}: NavBarProps) => {
  return (
    <div className="nav-bar">
      <div className="flex gap-2">
        {view === "Day" && (
          <>
            <button className="icon-btn">
              <LeftArrow />
            </button>
            <button
              className={`!px-6 icon-btn ${isTodayActive ? "active" : ""}`}
            >
              Today
            </button>
            <button className="icon-btn">
              <RightArrow />
            </button>
          </>
        )}
        {view === "Week" && (
          <>
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
          </>
        )}
        {view === "Month" && (
          <>
            <button className="icon-btn" onClick={showPrevMonth}>
              <LeftArrow />
            </button>
            <button
              className={`!px-6 icon-btn ${isTodayActive ? "active" : ""}`}
              onClick={showThisMonth}
            >
              Today
            </button>
            <button className="icon-btn" onClick={showNextMonth}>
              <RightArrow />
            </button>
          </>
        )}
        {view === "Year" && (
          <>
            <button className="icon-btn">
              <LeftArrow />
            </button>
            <button
              className={`!px-6 icon-btn ${isTodayActive ? "active" : ""}`}
            >
              Today
            </button>
            <button className="icon-btn">
              <RightArrow />
            </button>
          </>
        )}
      </div>
      <div className="flex gap-8">
        {CalendarView.map((list, index) => {
          return (
            <button
              className={`nav-link ${list.name === view ? "active" : ""}`}
              key={index}
              onClick={() => {
                handleView(list.name);
              }}
            >
              {list.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default NavBar;
