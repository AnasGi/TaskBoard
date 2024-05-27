import React from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TaskIcon from "@mui/icons-material/Task";
import DescriptionIcon from "@mui/icons-material/Description";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import "../styles/Menu.css";
import { useDispatch } from "react-redux";

export default function ShortMenu() {
  const navigate = useNavigate();
  const currentUrl = useLocation();
  const { userId } = useAuth();

  const dispatch = useDispatch();

  return (
    <div className="menu_container">
      <div className="menu shadow">
        <ArrowForwardIosIcon
          className="showMoreMenu shadow"
          onClick={() => dispatch({ type: "showExpandedMenu" })}
        />
        <ul className="links">
          <li onClick={() => navigate(`/`)}>
            <div className={currentUrl.pathname === "/" ? "active" : ""}>
              <TaskIcon />
            </div>
          </li>
          <li onClick={() => navigate(`/notes/${userId}`)}>
            <div
              className={
                currentUrl.pathname === `/notes/${userId}` ? "active" : ""
              }
            >
              <DescriptionIcon />
            </div>
          </li>
          <li onClick={() => navigate(`/statistics/${userId}`)}>
            <div
              className={
                currentUrl.pathname === `/statistics/${userId}` ? "active" : ""
              }
            >
              <LeaderboardIcon />
            </div>
          </li>
          <li>
            <div
              className={
                currentUrl.pathname === `/Feedback/${userId}` ? "active" : ""
              }
            >
              <ThumbUpAltIcon />
            </div>
          </li>
          <li>
            <div
              className={
                currentUrl.pathname === `/Contact-us/${userId}` ? "active" : ""
              }
            >
              <ContactSupportIcon />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}