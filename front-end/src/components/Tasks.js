import { useAuth } from "@clerk/clerk-react";
import { useDispatch, useSelector } from "react-redux";
import GetTasks from "../hooks/GetTasks";
import { useState } from "react";
import AddTasks from "./AddTasks";
import Category from "./Category";
import Checkbox from '@mui/material/Checkbox';
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { pink } from '@mui/material/colors';
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import GetFiltredData from "./GetFiltredData";
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';

export default function Tasks() {
  const clickedCateg = useSelector((data) => data.categ);

  const { userId } = useAuth();

  const allTasks = GetTasks();

  let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };

  const dispatch = useDispatch()
  const ShowAddTaskForm = useSelector(d=>d.showTaskForm)

  // const [ShowAddTaskForm, setShowAddTaskForm] = useState(false);
  const [showEditBtn, setShowEditBtn] = useState(false);
  const [StartEdit, setStartEdit] = useState(false);
  const [captureI, setCaptureI] = useState();
  const [DescriptionEdit, setDescriptionEdit] = useState("");

  //Filter state variables
  const [FilterByDate, setFilterByDate] = useState("");
  const [FilterByEmergency, setFilterByEmergency] = useState(false);
  const [FilterByCompletion, setFilterByCompletion] = useState(false);
  const [FilterByActive, setFilterByActive] = useState(false);
  const [IsClicked, setIsClicked] = useState({impo : false , done : false , active : false});
  
  //Sort state variables
  const [sortByDate, setsortByDate] = useState(false);
  const [sortAtoZ, setsortAtoZ] = useState(false);
  const [IsSorted, setIsSorted] = useState({bydate : false , az : false });

  //Search state variable
  const [search , setSearch] = useState('')
  
  //Filter
  const Tasks = GetFiltredData(allTasks , userId , clickedCateg , FilterByEmergency , FilterByDate , FilterByCompletion , FilterByActive , search , undefined)
  //Sort
  if(sortByDate){
    Tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }
  if(sortAtoZ){
    Tasks.sort((a , b)=>a.description.localeCompare(b.description))
  }

  function handleChangeTaskText(taskId){

    if(DescriptionEdit === ""){
      toast.error('Fill your Task')
    }
    else{
      axios.patch(`http://localhost:8000/api/tasks/${taskId}` , 
      {description : DescriptionEdit , createdAt : new Date()})
      .then(()=>window.location.reload())
      .catch(()=>toast.error('Error updating your task, try again!'))
    }
  }

  function handleChangeTaskDone(e,taskId){
    axios.patch(`http://localhost:8000/api/tasks/${taskId}` , 
    {isDone : e.target.checked})
    .then(()=>window.location.reload())
    .catch(()=>toast.error('Error updating your task, try again!'))
  }
  
  function handleChangeTaskImportant(e,taskId){
    axios.patch(`http://localhost:8000/api/tasks/${taskId}` , 
    {isImportant : e.target.checked})
    .then(()=>window.location.reload())
    .catch(()=>toast.error('Error updating your task, try again!'))
  }

  function handleDeleteTask(e , taskId){
    e.preventDefault();

    Swal.fire({
      title: "Confirmation",
      text: "Are you sure you want to delete this Task ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(
          `http://localhost:8000/api/tasks/${taskId}`
        )
        window.location.reload()
      }
    });
  }


  if (allTasks !== "load") {

    return (
      <div style={{ width: "90%" , height:"100vh", padding:"10px 0px"}}>
        <Toaster position="top-center" reverseOrder={false} />
        <div>
          <Category />
        </div>
        <div className="d-flex align-items-center gap-3 mt-2">
          <FilterAltIcon/>
          <div className={`btn fw-bold p-2 pt-1 pb-1 ${IsClicked.active ? 'btn-warning' : 'btn-outline-warning'}`} style={{fontSize:"12px"}} onClick={()=>{setFilterByActive(p=>!p) ; setIsClicked(p => ({...p,active: !p.active}))}} >
            Active
          </div>
          <div className={`btn fw-bold p-2 pt-1 pb-1 ${IsClicked.impo ? 'btn-danger' : 'btn-outline-danger'}`} style={{fontSize:"12px"}} onClick={()=>{setFilterByEmergency(p=>!p) ; setIsClicked(p => ({...p,impo: !p.impo}))}} >
            Important
          </div>
          <div className={`btn fw-bold p-2 pt-1 pb-1 ${IsClicked.done ? 'btn-success' : 'btn-outline-success'}`} style={{fontSize:"12px"}} onClick={()=>{setFilterByCompletion(p=>!p) ; setIsClicked(p => ({...p,done: !p.done}))}}>
            Completed
          </div>
          <input type="date" className="rounded p-2 pb-0 pt-0" onChange={e=>setFilterByDate(e.target.value)}/>
        </div>
        <div className="d-flex align-items-center gap-3 mt-2">
          <SortIcon/>
          <div className={`btn fw-bold p-2 pt-1 pb-1 ${IsSorted.bydate ? 'btn-primary' : 'btn-outline-primary'}`} style={{fontSize:"12px"}} onClick={()=>{setsortByDate(p=>!p) ; setIsSorted(p => ({...p,bydate: !p.bydate}))}} >
            sort by date
          </div>
          <div className={`btn fw-bold p-2 pt-1 pb-1 ${IsSorted.az ? 'btn-primary' : 'btn-outline-primary'}`} style={{fontSize:"12px"}} onClick={()=>{setsortAtoZ(p=>!p) ; setIsSorted(p => ({...p,az: !p.az}))}} >
            A-Z
          </div>
        </div>
        <div className="d-flex align-items-center gap-3 mt-2">
          <SearchIcon/>
          <input type="text" className="rounded p-2 pb-0 pt-0" onChange={(e)=>setSearch(e.target.value)}/>
        </div>
        {ShowAddTaskForm && <AddTasks/>}
        <div className="overflow-y-scroll mt-2 " style={{ maxHeight:"77%"}}>
          {Tasks.length !== 0
            ? Tasks.map((task, i) => (
                <div key={i} className="p-2 border border-2 rounded" style={{margin:"7px 5px 7px 0px"}} onMouseLeave={()=>setStartEdit(false)}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="w-50 d-flex align-items-center" onMouseOver={()=>{StartEdit ? setShowEditBtn(false) : setShowEditBtn(true);setCaptureI(i)}} onMouseLeave={()=>setShowEditBtn(false)}>
                      <Checkbox color="success" onClick={e=>handleChangeTaskDone(e,task._id)} checked={task.isDone} />
                      {
                        StartEdit && captureI === i ? 
                        <div className="d-flex align-items-center gap-3">
                          <textarea
                          style={{height:"30px"}}
                          onChange={e=>setDescriptionEdit(e.target.value)}
                          >{DescriptionEdit}</textarea>
                          <div className="d-flex gap-2 ">
                            <button onClick={()=>handleChangeTaskText(task._id)} style={{fontSize:"12px"}} className="btn btn-outline-success p-2 pt-1 pb-1">Save</button> 
                            <button className="btn btn-outline-dark p-2 pt-1 pb-1" style={{fontSize:"12px"}} onClick={()=>setStartEdit(false)}>Cancel</button>
                          </div>
                        </div>
                        : 
                        <div className="d-flex align-items-center" style={{width:'80%'}}>
                          <span className={`taskContent fw-bold ${task.isDone && 'text-decoration-line-through text-body-secondary'}`}>{task.description}</span>
                          <Checkbox
                            onClick={e=>handleChangeTaskImportant(e,task._id)}
                            checked={task.isImportant}
                            icon={<NotificationImportantOutlinedIcon />}
                            checkedIcon={<NotificationImportantIcon />}
                            sx={{
                              color: pink[800],
                              '&.Mui-checked': {
                                color: pink[600],
                              },
                            }}
                          />
                          {
                            showEditBtn && captureI === i && !task.isDone && 
                            <button 
                              onClick={()=>{setStartEdit(true) ; setDescriptionEdit(task.description) ; setShowEditBtn(false)}}
                              className="btn btn-outline-primary fw-bold p-2 pt-1 pb-1 rounded"
                              style={{fontSize:"12px"}}
                            >Edit</button>
                          }
                        </div>
                      }
                    </div>
                    <div className="d-flex gap-2" style={{width:"15%"}}>
                      {
                        task.isDone ? 
                        <span className="btn btn-success fw-bold p-2 pt-1 pb-1 rounded" style={{fontSize:"12px"}}>Done</span> 
                        : 
                        <span className="btn btn-warning fw-bold p-2 pt-1 pb-1 rounded" style={{fontSize:"12px"}}>Active</span>
                      }
                      {
                        task.isImportant &&
                        <span className="btn btn-danger fw-bold p-2 pt-1 pb-1 rounded" style={{fontSize:"12px"}}>Important</span> 
                      }
                    </div>
                    <div className="d-flex gap-2 text-body-secondary" style={{fontSize:"14px" , width:"15%"}}>
                      <span>{new Date(task.createdAt).toLocaleString('default' , options)}</span>
                    </div>
                    <div className="actionButtons">
                      <i className="btn btn-outline-danger p-2 border-0 bi bi-trash3-fill" onClick={e=>handleDeleteTask(e , task._id)}></i>
                    </div>
                  </div>
                </div>
              ))
            : clickedCateg !== "" && (
                <div className="d-flex align-items-center justify-content-center" style={{height:"500px"}}>
                  <p className="text-body-secondary">
                    No tasks available
                  </p>
                </div>
              )}

        </div>
          <Fab size="medium" color="secondary" aria-label="add" className="AddTaskIcon" style={{position:"absolute"}} onClick={() => dispatch({type : 'showTaskForm'})}>
            <AddIcon />
          </Fab>
        
      </div>
    );
  } else {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{width:"90%"}}>
        <CircularProgress />
      </div>
    );
  }
}
