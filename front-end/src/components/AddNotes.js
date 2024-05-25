import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "@clerk/clerk-react";

export default function AddNotes() {

  const dispatch = useDispatch();
  const ShowAddNoteForm = useSelector((d) => d.showNoteForm);

  const { userId } = useAuth();
  const [newNote, setNewNote] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (newNote.trim() === "" || newTitle.trim() === "") return;

    try {
      await axios.post("http://localhost:8000/api/notes", {
        title: newTitle,
        content: newNote,
        createdAt: new Date(),
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

  return (
    <Backdrop
      sx={{
        color: "#fff",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        zIndex: 2,
      }}
      open={ShowAddNoteForm}
    >
      <div className="d-flex justify-content-center align-items-center h-100 w-100">
        <form className="bg-light p-4 rounded shadow" style={{width:"40%"}} onSubmit={handleAddNote}>
        <h2 className="fw-bold text-dark mb-5">Create New Note</h2>
          <div className="mt3 mb-3 m-0">
            <TextField
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
              className="w-100"
              id="outlined-basic"
              label="Note title"
              variant="outlined"
            />
          </div>
          <div className="mt3 mb-3 m-0">
            <TextField
              className="w-100"
              id="outlined-multiline-static"
              label="Note text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              required
              multiline
              rows={4}
            />
          </div>
          <div className="d-flex gap-3">
            <button type="submit" className="btn btn-outline-primary">
              Add Note
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => dispatch({ type: "hideNoteForm" })}
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    </Backdrop>
  );
}
