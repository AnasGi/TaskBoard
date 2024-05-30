import React from "react";
import Stats from "./Stats";
import Tasks from "./Tasks";
import Notes from "./Notes";
import Support from "./Support";

export default function Content({ nav }) {
  if (nav === "tasks") {
    return <Tasks />;
  } else if (nav === "stats") {
    return <Stats />;
  }
  else if (nav === "notes") {
    return <Notes />;
  }
  else if (nav === "support") {
    return <Support />;
  }
}