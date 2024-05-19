import React from "react";
import { UserButton, useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";

import "../styles/Menu.css";
export default function Menu() {
  const navigate = useNavigate();
  const currentUrl = useLocation();

  const { isSignedIn, userId } = useAuth();

  const { user } = useUser();

  if (isSignedIn) {
    const email = user.primaryEmailAddress.emailAddress;
    let fullName;

    if (fullName) {
      fullName = user.fullName;
    } else {
      fullName = user.username;
    }
    return (
      <div className="menu bg-body-secondary shadow">
        <div className="profile">
          <UserButton />
          <div className="userinfo">
            <p className="username">{fullName}</p>
            <p className="email">{email}</p>
          </div>
          <div className="mt-3 w-100">
            <Paper
              component="form"
              sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search"
                inputProps={{ "aria-label": "search" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
        </div>
        <ul className="links">
          <li
            onClick={() => navigate(`/`)}
            className={currentUrl.pathname === "/" ? "active" : ""}
          >
            <span class="material-symbols-outlined">task</span>
            Tasks
          </li>
          <li
            onClick={() => navigate(`/notes/${userId}`)}
            className={
              currentUrl.pathname === `/notes/${userId}` ? "active" : ""
            }
          >
            <span class="material-symbols-outlined">description</span>
            Notes
          </li>
          <li
            onClick={() => navigate(`/statistics/${userId}`)}
            className={
              currentUrl.pathname === `/statistics/${userId}` ? "active" : ""
            }
          >
            <span class="material-symbols-outlined">leaderboard</span>{" "}
            Statistics
          </li>
          <li
            className={
              currentUrl.pathname === `/Feedback/${userId}` ? "active" : ""
            }
          >
            <span class="material-symbols-outlined">thumb_up</span>
            Feedback
          </li>
          <li
            className={
              currentUrl.pathname === `/Contact-us/${userId}` ? "active" : ""
            }
          >
            <span class="material-symbols-outlined">contact_support</span>{" "}
            Contact Us
          </li>
        </ul>
        <div className="sign-out">
          <button>
            <span class="material-symbols-outlined">logout</span>SignOut
          </button>
        </div>
      </div>
    );
  }
}
