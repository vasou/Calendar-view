import { CalendarView } from "../userdata/calendar";
import LeftArrow from "../assets/LeftArrow";
import RightArrow from "../assets/RightArrow";

interface NavBarProps {
  view: string;
  isTodayActive: boolean;
  showPrevWeek: () => void;
  showThisWeek: () => void;
  showNextWeek: () => void;
}

const NavBar = ({
  view,
  isTodayActive,
  showPrevWeek,
  showThisWeek,
  showNextWeek,
}: NavBarProps) => {
  return (
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
  );
};
export default NavBar;
