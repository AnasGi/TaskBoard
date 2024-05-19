import React from "react";
import Stats from "./Stats";
import Tasks from "./Tasks";
import Notes from "./Notes";

export default function Content({ nav }) {
  if (nav === "tasks") {
    return <Tasks />;
  } else if (nav === "stats") {
    return <Stats />;
  }
  else if (nav === "notes") {
    return <Notes />;
  }
}