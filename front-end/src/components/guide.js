import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import '../styles/Guide.css'

export default function Guide({ open, onClose }) {
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  return (
    <BootstrapDialog aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        TaskBoard User Guide
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <div className="Guide">
            <h1>TaskBoard App User Guide</h1>
            <p>
            The TaskBoard app helps you manage your tasks and notes efficiently.
            You can create, edit, and delete tasks and notes, and view statistics
            to track your productivity.
            </p>

            <h2>Getting Started</h2>
            <ul>
            <li>
                <strong>Login/Register:</strong>
                <ul>
                <li>
                    <strong>Register:</strong> If you are a new user, sign up by
                    providing your name, email, and password.
                </li>
                <li>
                    <strong>Login:</strong> If you are an existing user, log in with
                    your email and password.
                </li>
                </ul>
            </li>
            <li>
                <strong>Dashboard:</strong>
                <p>
                Upon logging in, you will be directed to the Dashboard. Here, you
                can see an overview of your tasks, notes, and basic statistics.
                </p>
            </li>
            </ul>

            <h2>Creating Tasks and Notes</h2>
            <ul>
            <li>
                <strong>Creating a Task:</strong>
                <ul>
                <li>Navigate to the "Tasks" section.</li>
                <li>Click the "Add Task" button.</li>
                <li>
                    Fill in the task details:
                    <ul>
                    <li>
                        <strong>Title:</strong> The name of the task.
                    </li>
                    <li>
                        <strong>Description:</strong> A brief description of the
                        task.
                    </li>
                    <li>
                        <strong>Due Date:</strong> Select the due date for the task.
                    </li>
                    <li>
                        <strong>Priority:</strong> Set the priority (Low, Medium,
                        High).
                    </li>
                    </ul>
                </li>
                <li>Click "Save" to add the task to your task list.</li>
                </ul>
            </li>
            <li>
                <strong>Creating a Note:</strong>
                <ul>
                <li>Navigate to the "Notes" section.</li>
                <li>Click the "Add Note" button.</li>
                <li>
                    Fill in the note details:
                    <ul>
                    <li>
                        <strong>Title:</strong> The title of the note.
                    </li>
                    <li>
                        <strong>Content:</strong> The content of the note.
                    </li>
                    </ul>
                </li>
                <li>Click "Save" to add the note to your notes list.</li>
                </ul>
            </li>
            </ul>

            <h2>Managing Tasks and Notes</h2>
            <ul>
            <li>
                <strong>Viewing Tasks and Notes:</strong>
                <ul>
                <li>
                    In the "Tasks" section, you can see a list of all your tasks.
                    You can sort them by due date, priority, or status.
                </li>
                <li>
                    In the "Notes" section, you can see a list of all your notes.
                    Notes can be searched by title or content.
                </li>
                </ul>
            </li>
            <li>
                <strong>Editing a Task or Note:</strong>
                <ul>
                <li>Click on the task or note you want to edit.</li>
                <li>Make the necessary changes in the details form.</li>
                <li>Click "Save" to update the task or note.</li>
                </ul>
            </li>
            <li>
                <strong>Deleting a Task or Note:</strong>
                <ul>
                <li>Click on the task or note you want to delete.</li>
                <li>Click the "Delete" button.</li>
                <li>Confirm the deletion in the prompt.</li>
                </ul>
            </li>
            </ul>

            <h2>Viewing Statistics</h2>
            <ul>
            <li>
                <strong>Task Statistics:</strong>
                <ul>
                <li>Navigate to the "Statistics" section.</li>
                <li>
                    View statistics such as:
                    <ul>
                    <li>
                        <strong>Total Tasks:</strong> Total number of tasks you have
                        created.
                    </li>
                    <li>
                        <strong>Completed Tasks:</strong> Number of tasks marked as
                        completed.
                    </li>
                    <li>
                        <strong>Pending Tasks:</strong> Number of tasks that are yet
                        to be completed.
                    </li>
                    <li>
                        <strong>Overdue Tasks:</strong> Number of tasks that are
                        past their due date.
                    </li>
                    </ul>
                </li>
                </ul>
            </li>
            <li>
                <strong>Note Statistics:</strong>
                <ul>
                <li>
                    View statistics such as:
                    <ul>
                    <li>
                        <strong>Total Notes:</strong> Total number of notes you have
                        created.
                    </li>
                    <li>
                        <strong>Recent Notes:</strong> Notes you have created
                        recently.
                    </li>
                    </ul>
                </li>
                </ul>
            </li>
            </ul>

            <h2>Additional Features</h2>
            <ul>
            <li>
                <strong>Search and Filter:</strong>
                <ul>
                <li>
                    Use the search bar to quickly find tasks or notes by title or
                    keywords.
                </li>
                <li>
                    Use filters to view tasks by their status (completed, pending,
                    overdue) or priority (low, medium, high).
                </li>
                </ul>
            </li>
            <li>
                <strong>Notifications:</strong>
                <p>
                Receive notifications for upcoming task deadlines and overdue
                tasks.
                </p>
            </li>
            </ul>

            <h2>Tips for Effective Use</h2>
            <ul>
            <li>
                <strong>Regular Updates:</strong> Regularly update your tasks and
                notes to keep track of your progress and ensure nothing is missed.
            </li>
            <li>
                <strong>Prioritize Tasks:</strong> Use the priority feature to focus
                on high-priority tasks first.
            </li>
            <li>
                <strong>Use Notes for Ideas:</strong> Jot down quick ideas or
                reminders in notes to keep your tasks uncluttered.
            </li>
            </ul>

            <p>
            By following this guide, you should be able to effectively use the
            TaskBoard app to manage your tasks and notes, enhancing your
            productivity and organization.
            </p>
        </div>
      </DialogContent>
    </BootstrapDialog>
  );
}
