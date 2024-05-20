import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "@clerk/clerk-react";
import GetNotes from "../hooks/GetNotes";
import CircularProgress from "@mui/material/CircularProgress";
import "../styles/Note.css";
export default function Notes() {
  const { userId } = useAuth();
  const [newNote, setNewNote] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const allnotes = GetNotes();

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (newNote.trim() === "" || newTitle.trim() === "") return;

    try {
      await axios.post("http://localhost:8000/api/notes", {
        title: newTitle,
        content: newNote,
        userId: userId,
      });
      Swal.fire({
        icon: "success",
        title: "Note Added",
        text: "Your note has been added successfully!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => window.location.reload());
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add note. Please try again later.",
        showCancelButton: true,
      });
    }
  };

  if (allnotes === "load") {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ width: "75%" }}
      >
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div
        style={{
          width: "75%",
          height: "100vh",
          overflowY: "auto",
          padding: "3px",
        }}
      >
        <h1>Notes</h1>
        <form className="w-50" onSubmit={handleAddNote}>
          <div className="form-floating mb-3">
            <input
              type="text"
              id="newTitle"
              className="form-control"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter a new note title"
              required
            />
            <label htmlFor="newTitle">Title</label>
          </div>
          <div className="form-floating mb-3">
            <textarea
              id="newNote"
              className="form-control"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Enter a new note"
              required
            />
            <label htmlFor="newNote">Description</label>
          </div>
          <button type="submit" class="btn btn-outline-primary">
            Add Note
          </button>
        </form>
        <div>
          {allnotes.length > 0 ? (
            <div className="notes">
              {allnotes.map((note) => (
                <div className="note  shadow" key={note.id}>
                  <p className="title">{note.title}</p>
                  <span className="content">{note.content}</span>
                  <div>
                    <span className="text-primary">Show More</span>
                    <span class="material-symbols-outlined text-danger">
                      delete
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No notes available.</p>
          )}
        </div>
      </div>
    );
  }
}
