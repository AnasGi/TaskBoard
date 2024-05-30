import React, { useEffect, useState } from "react";
import GetStats from "../hooks/GetStats";
import GetTasks from "../hooks/GetTasks";
import {
  BarChart,
  PieChart,
  Pie,
  Cell,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import GetCategories from "../hooks/GetCategories";
import { useAuth } from "@clerk/clerk-react";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import FilterListIcon from "@mui/icons-material/FilterList";
import CircularProgress from "@mui/material/CircularProgress";
import GetNotes from "../hooks/GetNotes";

export default function Stats() {
  const stats = GetStats();
  const tasks = GetTasks();
  const notes = GetNotes();
  const categories = GetCategories();
  const [chartDonnees, setChartDonnees] = useState();

  const { userId } = useAuth();

  function GetTasksStatus(status, bool) {
    if (tasks !== "load") {
      if (status === "isDone") {
        return tasks.filter(
          (task) => task.userId === userId && task.isDone === bool
        ).length;
      } else {
        return tasks.filter(
          (task) => task.userId === userId && task.isImportant === bool
        ).length;
      }
    }
  }

  const TasksStates = [
    {
      name: "Active tasks",
      value: GetTasksStatus("isDone", false),
    },
    {
      name: "Important tasks",
      value: GetTasksStatus("isImportant", true),
    },
    {
      name: "Completed tasks",
      value: GetTasksStatus("isDone", true),
    },
  ];

  const maxTaskState = TasksStates.reduce((max, taskState) => {
    return taskState.value > max.value ? taskState : max;
  }, TasksStates[0]);

  const COLORS = ["#FFBB28", "#FF8042", "#00C49F"];

  useEffect(() => {
    // Prepare the chart data based on tasks
    if (tasks !== "load") {
      let Tasks = tasks.filter((task) => task.userId === userId);
      const chartData = Tasks.reduce((acc, task) => {
        const day = new Date(task.createdAt).toLocaleDateString("default", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });

        if (!acc[day]) {
          acc[day] = { day, task: 0, completedTasks: 0 };
        }
        acc[day].task += 1;
        if (task.isDone) {
          acc[day].completedTasks += 1;
        }
        return acc;
      }, {});

      const chartDataArray = Object.values(chartData).map((data) => ({
        ...data,
        notCompletedTasks: data.task - data.completedTasks,
      }));

      chartDataArray.sort((a, b) => new Date(a.day) - new Date(b.day));

      setChartDonnees(chartDataArray);
    }
  }, [tasks, categories, userId]);

  function getNumberTasksByCateg(categ) {
    const taches = tasks.filter(
      (task) => task.userId === userId && task.nameCategory === categ
    );
    return taches.length;
  }

  if (stats !== "load" && tasks !== "load") {
    return (
      <div
        className="overflow-y-scroll"
        style={{ width: "90%", height: "100vh" }}
      >
        {stats.length > 0 ? (
          <div>
            <div className="d-flex justify-content-center align-items-center mt-2 mb-5 gap-5">
              <div className="d-flex gap-3 align-items-start mt-4 w-100">
                <div
                  className="d-flex flex-column gap-3"
                  style={{ width: "60%" }}
                >
                  <div className="w-100 card p-3 shadow">
                    <h5 className="fw-bold d-flex gap-2">
                      <LeaderboardIcon />
                      <span>Your daily progress</span>
                    </h5>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart
                        data={chartDonnees}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="1 1" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="completedTasks"
                          name="Completed tasks"
                          stackId="a"
                          fill="#82ca9d"
                        />
                        <Bar
                          dataKey="notCompletedTasks"
                          name="Incompleted tasks"
                          stackId="a"
                          fill="#ff8042"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {tasks !== "load" &&
                  tasks.filter((task) => task.userId === userId).length <= 0 ? (
                    <p className="text-center w-100 card shadow p-3">
                      No analytics yet
                    </p>
                  ) : (
                    <div className="w-100 card shadow p-3">
                      <div className="d-flex align-items-center">
                        <div className="">
                          <PieChart width={300} height={300}>
                            <Pie
                              data={TasksStates}
                              innerRadius={60}
                              outerRadius={80}
                              fill="#8884d8"
                              paddingAngle={5}
                              dataKey="value"
                              label
                            >
                              {TasksStates.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </div>
                        <div className="w-50">
                          <h5 className="fw-bold d-flex gap-2">
                            <TroubleshootIcon />
                            <span>Number of tasks by their status</span>
                          </h5>
                          <p className="text-body-secondary">
                            {maxTaskState.name === "Active tasks"
                              ? "You should complete your active tasks because letting them accumulate will result in tight deadlines."
                              : maxTaskState.name === "Completed tasks" &&
                                "Your have few tasks remaining, keep up the good work"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="d-flex flex-column gap-3">
                  <div className="d-flex gap-3 align-items-center justify-content-between">
                    {tasks !== "load" &&
                    tasks.filter((task) => task.userId === userId).length <=
                      0 ? (
                      <p className="text-center p-3 w-100">
                        No tasks available
                      </p>
                    ) : (
                      <div className="CircularProgressbarContainer">
                        <CircularProgressbar
                          value={
                            (stats[0].nbrTasksDone / stats[0].nbrTasks) * 100
                          }
                          text={`${(
                            (stats[0].nbrTasksDone / stats[0].nbrTasks) *
                            100
                          ).toFixed(2)}%`}
                          styles={buildStyles({
                            textColor: "#4caf50",
                            pathColor: "#4caf50",
                          })}
                        />
                        <p className="fw-bold text-center m-0">
                          Task completion rate
                        </p>
                      </div>
                    )}
                  </div>
                  <div
                    className="p-3 rounded shadow"
                    style={{
                      width: "100%",
                      color: "white",
                      backgroundColor: "#040852",
                    }}
                  >
                    <p className="m-0 fs-5">Total tasks</p>
                    {tasks !== "load" ? (
                      <p className="fw-bold fs-1">
                        {tasks.filter((task) => task.userId === userId).length}
                      </p>
                    ) : (
                      <p>Loading ...</p>
                    )}
                    <a href="/" className="text-light link-offset-1">
                      Show all tasks
                    </a>
                  </div>
                  <div
                    className="p-3 rounded shadow"
                    style={{
                      width: "100%",
                      color: "white",
                      backgroundColor: "#19E353",
                    }}
                  >
                    <p className="m-0 fs-5">Total notes</p>
                    {notes !== "load" ? (
                      <p className="fw-bold fs-1">
                        {notes.filter((task) => task.userId === userId).length}
                      </p>
                    ) : (
                      <p>Loading ...</p>
                    )}
                    <a
                      href={`/notes/${userId}`}
                      className="text-light link-offset-1"
                    >
                      Show all notes
                    </a>
                  </div>
                  <div className="card p-3 shadow">
                    <h5 className="fw-bold  d-flex gap-2">
                      <FilterListIcon />
                      <span>Tasks number by categories</span>
                    </h5>
                    {categories !== "load" &&
                      (categories.filter(
                        (category) => category.userId === userId
                      ).length <= 0 ? (
                        <p className="text-center pt-3">No categories yet</p>
                      ) : (
                        categories
                          .filter((category) => category.userId === userId)
                          .map((userCateg, i) => (
                            <div
                              key={i}
                              className="d-flex gap-3 align-items-center mt-1"
                            >
                              <span
                                className="fw-bold"
                                style={{ width: "150px" }}
                              >
                                {userCateg.nameCategory}:
                              </span>
                              <ProgressBar
                                style={{ width: "200px" }}
                                max={
                                  tasks.filter(
                                    (task) =>
                                      task.userId === userId &&
                                      task.nameCategory !== "all"
                                  ).length
                                }
                                variant="warning"
                                now={getNumberTasksByCateg(
                                  userCateg.nameCategory
                                )}
                                label={getNumberTasksByCateg(
                                  userCateg.nameCategory
                                )}
                              />
                            </div>
                          ))
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>No statistics available.</p>
        )}
      </div>
    );
  } else {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ width: "90%" }}
      >
        <CircularProgress />
      </div>
    );
  }
}
