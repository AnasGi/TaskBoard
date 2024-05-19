import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '@clerk/clerk-react';
import GetNotes from '../hooks/GetNotes';
import CircularProgress from '@mui/material/CircularProgress';

export default function Notes() {
  const { userId } = useAuth();
  const [newNote, setNewNote] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const allnotes = GetNotes()

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (newNote.trim() === '' || newTitle.trim() === '') return;

    try {
      await axios.post('http://localhost:8000/api/notes', {
        title: newTitle,
        content: newNote,
        userId: userId,
      });
      Swal.fire({
        icon: 'success',
        title: 'Note Added',
        text: 'Your note has been added successfully!',
        showConfirmButton: false,
        timer: 1500,
      }).then(()=>window.location.reload())
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add note. Please try again later.',
        showCancelButton: true,
      });
    }
  };

  if (allnotes === "load") {
    return <div className="d-flex justify-content-center align-items-center" style={{width:"75%"}}>
        <CircularProgress />
</div>;
  }
  else{
      return (
        <div style={{width:"75%"}}>
          <h1>Notes</h1>
          <form onSubmit={handleAddNote}>
            <div>
              <label htmlFor="newTitle">Title:</label>
              <input
                type="text"
                id="newTitle"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter a new note title"
                required
              />
            </div>
            <div>
              <label htmlFor="newNote">Note:</label>
              <input
                type="text"
                id="newNote"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Enter a new note"
                required
              />
            </div>
            <button type="submit">Add Note</button>
          </form>
          <div>
            {allnotes.length > 0 ? (
              <ul>
                {allnotes.map((note) => (
                  <li key={note.id}>
                    <strong>{note.title}</strong>: {note.content}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No notes available.</p>
            )}
          </div>
        </div>
      );
  }

}