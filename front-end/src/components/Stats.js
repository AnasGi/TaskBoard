import React, { useEffect , useState } from "react";
import GetStats from "../hooks/GetStats";
import GetTasks from "../hooks/GetTasks";
import { BarChart,PieChart,Pie, Cell, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import GetCategories from "../hooks/GetCategories";
import { useAuth } from "@clerk/clerk-react";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import FilterListIcon from '@mui/icons-material/FilterList';
import CircularProgress from '@mui/material/CircularProgress';



export default function Stats() {
  const stats = GetStats();
  const tasks = GetTasks();
  const categories = GetCategories()
  const [chartDonnees, setChartDonnees] = useState();

  const {userId} = useAuth()

  function GetTasksStatus(status , bool){
    if(tasks !== 'load'){
      if(status === "isDone"){
        return tasks.filter(task=>task.userId === userId && task.isDone === bool).length
      }
      else{
        return tasks.filter(task=>task.userId === userId && task.isImportant === bool).length
      }
    }
  }

  const TasksStates = [ 
    {
      name : 'Active tasks',value:GetTasksStatus("isDone" , false)
    },
    {
      name : 'Important tasks',value:GetTasksStatus("isImportant" , true)
    },
    {
      name : 'Completed tasks',value:GetTasksStatus("isDone",true)
    },
  ]

  const maxTaskState = TasksStates.reduce((max, taskState) => {
    return taskState.value > max.value ? taskState : max;
  }, TasksStates[0]);

  const COLORS = ['#FFBB28', '#FF8042' ,'#00C49F' ];


  useEffect(() => {
    // Prepare the chart data based on tasks
    if(tasks !== "load"){
      let Tasks = tasks.filter(task=>task.userId === userId)
      const chartData =
        Tasks.reduce((acc, task) => {
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
    
        chartDataArray.sort((a, b) =>new Date(a.day)-new Date(b.day));
    
        setChartDonnees(chartDataArray);
    }



  }, [tasks , categories , userId]);

  function getNumberTasksByCateg(categ){
    const taches = tasks.filter(task=>task.userId === userId && task.nameCategory === categ)
    return taches.length
  }

  if(stats !== 'load' && tasks !== 'load'){
    return (
      <div className="overflow-y-scroll" style={{ width:"90%" , height:"100vh"}}>
        {stats.length > 0 ? (
          <div>
            
  
            <div className="d-flex justify-content-center align-items-center mt-5 gap-5">
              <div className="border p-3 rounded shadow" style={{width:"150px" ,color:"white" , backgroundColor:"#040852"}}>
                <p className="m-0 fs-5">Total tasks</p>
                {
                  tasks !== "load" ?
                  <p className="fw-bold fs-1">{tasks.filter(task=>task.userId === userId).length}</p>
                  :
                  <p>Loading ...</p>
                }
                <a href="/" className="text-light link-offset-1">Show all tasks</a>
              </div>
              <div className="card p-3 shadow">
                  <h5 className="fw-bold  d-flex gap-2">
                    <FilterListIcon/>
                    <span>
                      Tasks number by categories
                    </span>
                  </h5>
                  {
                    categories !== 'load' &&
                    categories.filter(category=>category.userId === userId).map((userCateg , i)=>
                      <div key={i} className="d-flex gap-3 align-items-center mt-1">
                        <span className="fw-bold" style={{width:"150px"}}>{userCateg.nameCategory}:</span>
                        <ProgressBar 
                          style={{width:"200px"}}
                          max={tasks.filter(task=>task.userId === userId && task.nameCategory !== 'all').length}
                          variant="warning"
                          now={getNumberTasksByCateg(userCateg.nameCategory)} 
                          label={getNumberTasksByCateg(userCateg.nameCategory)}
                        />  
                      </div>
                    )
                  }
                </div>   
                <div className="CircularProgressbarContainer">
                  <CircularProgressbar value={(stats[0].nbrTasksDone / stats[0].nbrTasks) * 100} text={`${((stats[0].nbrTasksDone / stats[0].nbrTasks) * 100).toFixed(2)}%`} styles={buildStyles({ textColor: "#4caf50", pathColor: "#4caf50" })} />
                  <p className="fw-bold text-center m-0">Task completion rate</p>
                </div>
            </div>
            <div className="mt-5 m-3 mb-5 d-flex justify-content-center align-items-center">
              <div className="w-50">
                <h5 className="fw-bold d-flex gap-2">
                  <TroubleshootIcon/>
                  <span>
                    Number of tasks by their status
                  </span>
                </h5>
                <p className="text-body-secondary">
                  {
                    maxTaskState.name === 'Active tasks' ?
                    "You should complete your active tasks because letting them accumulate will result in tight deadlines."
                    : maxTaskState.name === 'Completed tasks' &&
                    "Your have few tasks remaining, keep up the good work"
                  }
                </p>
              </div>

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
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip/>
                  <Legend/>
                </PieChart>
              </div>
            </div>

            
  
            <div className="mt-5 m-3 mb-5 p-3 card shadow">
              <h5 className="fw-bold d-flex gap-2">
              <LeaderboardIcon/>
              <span>
                Your daily progress
              </span>
              </h5>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartDonnees} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completedTasks" name="Completed tasks" stackId="a" fill="#82ca9d" />
                  <Bar dataKey="notCompletedTasks" name="Incompleted tasks" stackId="a" fill="#ff8042" />
                </BarChart>
              </ResponsiveContainer>
            </div>
  
            {/* Rendu conditionnel des listes de tâches */}
            {/* {stats.map((st, index) => (
              <div key={index} className="mb-4">
                <div className="list-group-item" style={{ backgroundColor: "#ffffff" }}>
                  <div className="mb-3">
                    <strong>Nombre de tâches : {st.nbrTasks}</strong>
                  </div>
                  <button className="btn btn-primary mb-3" onClick={() => setShowAllTasks(!showAllTasks)}>
                    {showAllTasks ? "Cacher toutes les tâches" : "Voir toutes les tâches"} <i className={`bi ${showAllTasks ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                  </button>
                  <div className="mb-3">
                    <strong>Nombre de tâches terminées : {st.nbrTasksDone}</strong>
                  </div>
                  <button className="btn btn-primary mb-3" onClick={() => setShowCompletedTasks(!showCompletedTasks)}>
                    {showCompletedTasks ? "Cacher les tâches terminées" : "Voir les tâches terminées"} <i className={`bi ${showCompletedTasks ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                  </button>
  
                  {showAllTasks && (
                    <div className="mt-3">
                      <h5>Toutes les tâches :</h5>
                      <ul className="list-group">
                        {tasks.map((ts, index) => (
                          <li key={index} className="list-group-item" style={{ backgroundColor: "#f8f9fa" }}>
                            <div>
                              <p>Description : {ts.description}</p>
                              <p>Catégorie : {ts.nameCategory}</p>
                              {ts.isDone ? (
                                <i className="bi bi-check-circle-fill text-success"></i>
                              ) : (
                                <i className="bi bi-x-circle-fill text-danger"></i>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
  
                  {showCompletedTasks && (
                    <div className="mt-3">
                      <h5>Tâches terminées :</h5>
                      <ul className="list-group">
                        {tasks.filter(ts => ts.isDone).map((ts, index) => (
                          <li key={index} className="list-group-item" style={{ backgroundColor: "#f8f9fa" }}>
                            <div>
                              <p>Description : {ts.description}</p>
                              <p>Catégorie : {ts.nameCategory}</p>
                              <i className="bi bi-check-circle-fill text-success"></i>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))} */}
          </div>
        ) : (
          <p>No statistics available.</p>
        )}
      </div>
    );
  }
  else{
    return <div className="d-flex justify-content-center align-items-center" style={{width:"90%"}}>
      <CircularProgress />
    </div>
  }
}
