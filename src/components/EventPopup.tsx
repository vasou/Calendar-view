import React from "react";
import Close from "../assets/Close";
import { format } from "date-fns";
import GoogleMeet from "../assets/GoogleMeet";

interface EventPopupProps {
  popupToggle: boolean;
  eventList: any;
  handlePopup: () => void;
}

const EventPopup = ({
  popupToggle,
  eventList,
  handlePopup,
}: EventPopupProps) => {
  return (
    <div className={`event-popup ${popupToggle ? "open" : ""}`}>
      <div className="card">
        <div className="flex justify-end mb-2">
          <button onClick={handlePopup}>
            <Close />
          </button>
        </div>
        <div className="event-content">
          <div className="left">
            <p>Event description: {eventList?.desc}</p>
            <p>
              Inteview with: {eventList.user_det.candidate.candidate_firstName}{" "}
              {eventList.user_det.candidate.candidate_lastName}
            </p>
            <p>
              Handled by: {eventList.user_det.handled_by.firstName}{" "}
              {eventList.user_det.handled_by.lastName}
            </p>
            <p>Interview date: {format(eventList.start, "dd-MM-yyyy")}</p>
            <p>
              Interview time: <span>{format(eventList.start, "hh:mm b")}</span>
              {" - "}
              <span>{format(eventList.end, "hh:mm b")}</span>
            </p>
            <p>Interview via: Google Meet</p>
          </div>
          <div className="right">
            <div>
              <div className="w-40">
                <GoogleMeet />
              </div>
              <div className="text-center">
                <a
                  href={eventList.link}
                  target="_blank"
                  className="link-button"
                >
                  Join
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventPopup;
