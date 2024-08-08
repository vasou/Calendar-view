import { format, startOfToday } from "date-fns";

interface CalendarHeaderProps {
  dates: Date[];
  view: string;
}

const CalendarHeader = ({ dates, view }: CalendarHeaderProps) => {
  return (
    <div className="calendar-header">
      {view === "Day" && (
        <>
          <div className="timeslots"></div>
          <>
            {dates &&
              dates.map((item, index) => {
                return (
                  <div className="day-wrapper" key={index}>
                    <div className="flex flex-col justify-center items-center gap-2 h-full">
                      {format(item, "d MMM") ===
                      format(startOfToday(), "d MMM") ? (
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
        </>
      )}
      {view === "Week" && (
        <>
          <div className="timeslots"></div>
          <>
            {dates &&
              dates.map((item, index) => {
                return (
                  <div className="day-wrapper" key={index}>
                    <div className="flex flex-col justify-center items-center gap-2 h-full">
                      {format(item, "d MMM") ===
                      format(startOfToday(), "d MMM") ? (
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
        </>
      )}
      {view === "Month" && (
        <>
          {/* {dates &&
            dates.map((item, index) => {
              return (
                <div className="day-wrapper" key={index}>
                  <div className="flex flex-col justify-center items-center gap-2 h-full">
                    {format(item, "d MMM") ===
                    format(startOfToday(), "d MMM") ? (
                      <p className="text-blue-700">{format(item, "d MMM")}</p>
                    ) : (
                      <p>{format(item, "d MMM")}</p>
                    )}

                    <p className="text-gray-500">{format(item, "EEEE")}</p>
                  </div>
                </div>
              );
            })} */}
        </>
      )}
      {view === "Year" && (
        <>
          <div className="timeslots"></div>
          <>
            {/* {dates &&
              dates.map((item, index) => {
                return (
                  <div className="day-wrapper" key={index}>
                    <div className="flex flex-col justify-center items-center gap-2 h-full">
                      {format(item, "d MMM") ===
                      format(startOfToday(), "d MMM") ? (
                        <p className="text-blue-700">{format(item, "d MMM")}</p>
                      ) : (
                        <p>{format(item, "d MMM")}</p>
                      )}

                      <p className="text-gray-500">{format(item, "EEEE")}</p>
                    </div>
                  </div>
                );
              })} */}
          </>
        </>
      )}
    </div>
  );
};
export default CalendarHeader;
