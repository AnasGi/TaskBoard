import GetNotes from "../hooks/GetNotes";
import CircularProgress from "@mui/material/CircularProgress";
import "../styles/Note.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import AddNotes from "./AddNotes";
import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import Backdrop from "@mui/material/Backdrop";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import GetFiltredData from "./GetFiltredData";
import SearchIcon from "@mui/icons-material/Search";

export default function Notes() {
  const dispatch = useDispatch();
  const ShowAddTaskForm = useSelector((d) => d.showNoteForm);
  const allnotes = GetNotes();
  const { userId } = useAuth();

  let options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  //filter
  const [FilterByDate, setFilterByDate] = useState("");
  //sort
  const [sortByDate, setsortByDate] = useState(false);
  const [sortAtoZ, setsortAtoZ] = useState(false);
  const [IsSorted, setIsSorted] = useState({ bydate: false, az: false });
  //Search state variable
  const [search, setSearch] = useState("");

  const UserNotes = GetFiltredData(
    allnotes,
    userId,
    undefined,
    undefined,
    FilterByDate,
    undefined,
    undefined,
    undefined,
    search
  );

  //Sort
  if (sortByDate) {
    UserNotes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  if (sortAtoZ) {
    UserNotes.sort((a, b) => a.content.localeCompare(b.content));
  }

  if (allnotes === "load") {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ width: "90%" }}
      >
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div
        style={{
          width: "90%",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <div className="m-4">
          <div className="d-flex align-items-center gap-3 mt-2">
            <FilterAltIcon />
            <input
              type="date"
              className="rounded p-2 pb-0 pt-0"
              onChange={(e) => setFilterByDate(e.target.value)}
            />
          </div>
          <div className="d-flex align-items-center gap-3 mt-2">
            <SortIcon />
            <div
              className={`btn fw-bold p-2 pt-1 pb-1 ${
                IsSorted.bydate ? "btn-primary" : "btn-outline-primary"
              }`}
              style={{ fontSize: "12px" }}
              onClick={() => {
                setsortByDate((p) => !p);
                setIsSorted((p) => ({ ...p, bydate: !p.bydate }));
              }}
            >
              sort by date
            </div>
            <div
              className={`btn fw-bold p-2 pt-1 pb-1 ${
                IsSorted.az ? "btn-primary" : "btn-outline-primary"
              }`}
              style={{ fontSize: "12px" }}
              onClick={() => {
                setsortAtoZ((p) => !p);
                setIsSorted((p) => ({ ...p, az: !p.az }));
              }}
            >
              A-Z
            </div>
          </div>
          <div className="d-flex align-items-center gap-3 mt-2">
            <SearchIcon />
            <input
              type="text"
              className="rounded p-2 pb-0 pt-0"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="">
          {UserNotes.length > 0 ? (
            <div className="notes">
              {UserNotes.map((note, i) => (
                <div
                  className="note shadow"
                  key={note.id}
                  style={{ cursor: "zoom-in" }}
                  onClick={() => {
                    setIndex(i);
                    setOpen(true);
                  }}
                >
                  <p className="title">{note.title}</p>
                  <span className="content">{note.content}</span>
                  <span
                    className="text-body-secondary"
                    style={{ fontSize: "14px" }}
                  >
                    {new Date(note.createdAt).toLocaleString(
                      "default",
                      options
                    )}
                  </span>
                  <div>
                    <span class="material-symbols-outlined text-success">
                      edit
                    </span>
                    <span class="material-symbols-outlined text-danger">
                      delete
                    </span>
                  </div>
                </div>
              ))}
              {ShowAddTaskForm && <AddNotes />}

              <Backdrop
                sx={{
                  color: "#fff",
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={open}
              >
                <div className="NoteDetails bg-light p-3 text-dark rounded w-50">
                  <h1 className="fw-bold">{UserNotes[index].title}</h1>
                  <p style={{ fontSize: "18px" }}>{UserNotes[index].content}</p>
                  <p
                    className="text-body-secondary"
                    style={{ fontSize: "15px" }}
                  >
                    {new Date(UserNotes[index].createdAt).toLocaleString(
                      "default",
                      options
                    )}
                  </p>
                  <button
                    onClick={() => {
                      setOpen(false);
                    }}
                    className="btn btn-outline-dark"
                  >
                    Close
                  </button>
                </div>
              </Backdrop>
            </div>
          ) : (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "80vh" }}
            >
              <p className="text-body-secondary">No notes available.</p>
            </div>
          )}
          <Fab
            size="medium"
            color="secondary"
            aria-label="add"
            className="AddTaskIcon"
            style={{ position: "absolute" }}
            onClick={() => dispatch({ type: "showNoteForm" })}
          >
            <AddIcon />
          </Fab>
        </div>
      </div>
    );
  }
}
