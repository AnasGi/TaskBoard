import { useAuth } from "@clerk/clerk-react";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import noTasksImg from "../Assets/error.jpg";
import GetNotes from "../hooks/GetNotes";
import "../styles/Note.css";
import AddNotes from "./AddNotes";
import GetFiltredData from "./GetFiltredData";

export default function Notes() {
  const dispatch = useDispatch();
  const ShowAddNoteForm = useSelector((d) => d.showNoteForm);
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
  const [idx, setIdx] = useState(0);
  const [unableEdit, setUnableEdit] = useState(false);
  const [noteTitleToUpdate, setNoteTitleToUpdate] = useState("");
  const [noteContentToUpdate, setNoteContentToUpdate] = useState("");

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

  async function handleUpdateNote(noteId) {
    let noteToModify = {};

    if (noteTitleToUpdate === "") {
      noteToModify = { content: noteContentToUpdate };
    } else if (noteContentToUpdate === "") {
      noteToModify = { title: noteTitleToUpdate };
    } else {
      noteToModify = {
        title: noteTitleToUpdate,
        content: noteContentToUpdate,
      };
    }

    try {
      await axios.put(
        `http://localhost:8000/api/notes/${noteId}`,
        noteToModify
      );
      Swal.fire({
        icon: "success",
        title: "Note Updated",
        text: "Your note has been updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => window.location.reload());
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update note. Please try again later.",
        showCancelButton: true,
      });
    }
  }

  console.log(ShowAddNoteForm);

  function handleDeleteTask(noteId) {
    Swal.fire({
      title: "Confirmation",
      text: "Are you sure you want to delete this note ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8000/api/notes/${noteId}`);
        window.location.reload();
      }
    });
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
          <div>
            <h1 className="fw-bold mb-4">
              {new Date().toLocaleString("default", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })}
            </h1>
          </div>
          <div className="d-flex align-items-center gap-5">
            <div className="d-flex align-items-center gap-3 mt-2">
              <FilterAltIcon />
              <input
                type="date"
                className="rounded p-2 pb-0 pt-0"
                onChange={(e) => setFilterByDate(e.target.value)}
              />
            </div>
            <svg width="1" height="20">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100"
                stroke="black"
                stroke-width="1"
              />
            </svg>
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
            <svg width="1" height="20">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100"
                stroke="black"
                stroke-width="1"
              />
            </svg>
            <div className="d-flex align-items-center gap-3 mt-2">
              <SearchIcon />
              <input
                type="text"
                placeholder="search"
                className="rounded p-2 pb-0 pt-0"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="">
          {ShowAddNoteForm && <AddNotes />}
          {UserNotes.length > 0 ? (
            <div className="notes">
              {UserNotes.map((note, i) => (
                <div className="position-relative">
                  <div
                    className="note shadow "
                    key={i}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setIdx(i);
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
                  </div>
                  <div
                    className="d-flex justify-content-end w-100 position-absolute"
                    style={{ bottom: "4%", right: "2%" }}
                  >
                    <i
                      className="btn btn-outline-danger p-2 pt-1 pb-1 border-0 bi bi-trash3-fill"
                      onClick={() => {
                        handleDeleteTask(note._id);
                      }}
                    ></i>
                  </div>
                </div>
              ))}
              <Backdrop
                sx={{
                  color: "#fff",
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  zIndex: (theme) => 1,
                }}
                open={open}
              >
                <div className="NoteDetails bg-light p-3 text-dark rounded w-50">
                  <h1 className="fw-bold">
                    <textarea
                      style={{ maxHeight: "60px" }}
                      key={open}
                      onChange={(e) => {
                        setUnableEdit(true);
                        setNoteTitleToUpdate(e.target.value);
                      }}
                      defaultValue={UserNotes[idx].title}
                    />
                  </h1>
                  <p style={{ fontSize: "18px" }}>
                    <textarea
                      key={open}
                      onChange={(e) => {
                        setUnableEdit(true);
                        setNoteContentToUpdate(e.target.value);
                      }}
                      defaultValue={UserNotes[idx].content}
                    />
                  </p>
                  <p
                    className="text-body-secondary"
                    style={{ fontSize: "15px" }}
                  >
                    {new Date(UserNotes[idx].createdAt).toLocaleString(
                      "default",
                      options
                    )}
                  </p>
                  <div className="d-flex gap-2">
                    {unableEdit && (
                      <button
                        className="btn btn-outline-success"
                        onClick={(e) => handleUpdateNote(UserNotes[idx]._id)}
                      >
                        save
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setOpen(false);
                        setUnableEdit(false);
                        setNoteTitleToUpdate(UserNotes[idx].title);
                        setNoteContentToUpdate(UserNotes[idx].content);
                      }}
                      className="btn btn-outline-dark"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Backdrop>
            </div>
          ) : (
            <div
              className="d-flex flex-column align-items-center justify-content-center"
              style={{ height: "500px" }}
            >
              <img src={noTasksImg} alt="" className="icon" />
              <p className="no-content">No Notes Available</p>
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
