import React from "react";
import { UserButton, useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import TaskIcon from "@mui/icons-material/Task";
import DescriptionIcon from "@mui/icons-material/Description";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import FormControlLabel from "@mui/material/FormControlLabel";
import MaterialUISwitch from "./ThemeSwitch";

import "../styles/Menu.css";
import { useDispatch } from "react-redux";
export default function ExpandedMenu() {
  const navigate = useNavigate();
  const currentUrl = useLocation();

  const { isSignedIn, userId } = useAuth();

  const { user } = useUser();

  const dispatch = useDispatch();

  if (isSignedIn) {
    const email = user.primaryEmailAddress.emailAddress;
    let fullName;

    if (fullName) {
      fullName = user.fullName;
    } else {
      fullName = user.username;
    }
    return (
      <div className="menu_container" style={{ marginRight: "50px" }}>
        <div className="menu shadow">
          <ArrowBackIosNewIcon
            className="showMoreMenu shadow"
            onClick={() => dispatch({ type: "showShordMenu" })}
          />
          <ul className="ExpandedLinks">
            <li onClick={() => navigate(`/`)}>
              <div className={currentUrl.pathname === "/" ? "active" : ""}>
                <TaskIcon />
              </div>
              Tasks
            </li>
            <li onClick={() => navigate(`/notes/${userId}`)}>
              <div
                className={
                  currentUrl.pathname === `/notes/${userId}` ? "active" : ""
                }
              >
                <DescriptionIcon />
              </div>
              <span>Notes</span>
            </li>
            <li onClick={() => navigate(`/statistics/${userId}`)}>
              <div
                className={
                  currentUrl.pathname === `/statistics/${userId}`
                    ? "active"
                    : ""
                }
              >
                <LeaderboardIcon />
              </div>
              <span>Statistics</span>
            </li>
            
            <li onClick={() => navigate(`/support/${userId}`)}>
              <div
                className={
                  currentUrl.pathname === `/support/${userId}`
                    ? "active"
                    : ""
                }
              >
                <ContactSupportIcon />
              </div>
              <span>Support</span>
            </li>
            <hr className="mt-3 mb-3" />
            <div className="pt-2 pb-2" style={{ padding: "10px" }}>
              <div className="d-flex align-items-center gap-3 justify-content-center w-100">
                <UserButton />
                <div className="d-flex flex-column">
                  <span className="username">{fullName}</span>
                  <span className="username">{email}</span>
                </div>
              </div>
            </div>
            <div className="mt-3 w-100 d-flex align-items-center justify-content-center">
              <div className="themeSwith">
                <FormControlLabel
                  control={<MaterialUISwitch defaultChecked />}
                />
              </div>
            </div>
          </ul>
        </div>
      </div>
    );
  }
}
