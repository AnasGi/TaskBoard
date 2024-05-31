import React from "react";
import Stats from "./Stats";
import Tasks from "./Tasks";
import Notes from "./Notes";
import Support from "./Support";
import GetCategories from "../hooks/GetCategories";
import GetTasks from "../hooks/GetTasks";
import GetNotes from "../hooks/GetNotes";
import GetStats from "../hooks/GetStats";
import Error from "./Error";

export default function Content({ nav }) {

  const tasks = GetTasks();
  const notes = GetNotes();
  const stats = GetStats();
  const categs = GetCategories();

  if (nav === "tasks") {
    if (tasks[0].error === 'Error' || categs[0].error === "Error"){
      return <Error data="tasks"/>
    }
    else{
      return <Tasks />;
    }
  } else if (nav === "stats") {
    if(stats[0].error === "Error" || tasks[0].error === 'Error' || categs[0].error === "Error" || notes[0].error === "Error"){
      return <Error data="statistics"/>
    }
    else{
      return <Stats />;
    }
  }
  else if (nav === "notes") {
    if(notes[0].error === "Error"){
      return <Error data="notes"/>
    }
    else{
      return <Notes />;
    }
  }
  else if (nav === "support") {
    return <Support />;
  }
}