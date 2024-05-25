import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "@clerk/clerk-react";
import GetCategories from "../hooks/GetCategories";
import toast, { Toaster } from "react-hot-toast";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Backdrop from "@mui/material/Backdrop";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";

export default function AddTasks() {
  const [description, setDescription] = useState("");
  const [nameCategory, setNameCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("green");
  const [CreateNewCateForm, setCreateNewCateForm] = useState(false);
  const { userId } = useAuth();

  const dispatch = useDispatch()
  const ShowAddTaskForm = useSelector(d=>d.showTaskForm)


  const categories = GetCategories();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let selectedCategory = nameCategory === "" ? newCategory : nameCategory;

    const isCategExist = categories.filter(
      (categ) => categ.nameCategory === newCategory && categ.userId === userId
    );

    if (selectedCategory === newCategory) {
      if (isCategExist.length !== 0) {
        toast.error("This category name already exists");
      } else if (selectedCategory !== "" && selectedCategory !== "all") {
        axios.post("http://localhost:8000/api/categories", {
          nameCategory: newCategory,
          color: newCategoryColor,
          userId: userId,
        });
      }
    }

    let newTask;

    if (selectedCategory === "") {
      newTask = {
        description,
        nameCategory: "all",
        createdAt: new Date(),
        userId,
      };
    } else {
      newTask = {
        description,
        nameCategory: selectedCategory,
        createdAt: new Date(),
        userId,
      };
    }

    if (isCategExist.length === 0) {
      try {
        await axios.post("http://localhost:8000/api/tasks", newTask);
        Swal.fire({
          icon: "success",
          title: "Task Added",
          text: "Your task has been added successfully!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => window.location.reload());
      } catch (error) {
        console.error("Error adding task:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add task. Please try again later.",
          showCancelButton: "Back",
        });
      }
    }
  };

  if (categories !== "load") {
    return (
      <div className="addTaskForm">
        <Toaster position="top-center" reverseOrder={false} />
        <Backdrop
          sx={{
            color: "#fff",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            zIndex: 2,
          }}
          open={ShowAddTaskForm}
        >
          <form onSubmit={handleSubmit} className=" bg-light p-4 rounded shadow" style={{width:"40%"}}>
            <h2 className="fw-bold text-dark mb-5">Create New task</h2>
              <div className="m-0 mt-3 mb-3">
                <TextField
                  id="outlined-basic"
                  label="Enter new Task"
                  variant="outlined"
                  className="w-100"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="m-0 mt-3 mb-3">
                {CreateNewCateForm ? (
                  <div className="d-flex gap-2">
                    <TextField
                      style={{ width: "150px" }}
                      type="color"
                      id="outlined-basic"
                      variant="outlined"
                      label="Category color"
                      defaultValue={"#008000"}
                      onChange={(e) => setNewCategoryColor(e.target.value)}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Enter new category name"
                      variant="outlined"
                      className="w-100"
                      onChange={(e) => setNewCategory(e.target.value)}
                      value={newCategory}
                      required
                    />
                  </div>
                ) : (
                  <FormControl className="w-100">
                    <InputLabel id="demo-simple-select-label">
                      Choose an existing category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Choose an existing category"
                      onChange={(e) => {
                        setNameCategory(e.target.value);
                        setNewCategory("");
                      }}
                    >
                      {categories
                        .filter((cteg) => cteg.userId === userId)
                        .map((category) => (
                          <MenuItem
                            key={category._id}
                            value={category.nameCategory}
                          >
                            {category.nameCategory}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                )}
                <p
                  className="text-body-secondary text-decoration-underline"
                  style={{ textAlign: "right", cursor: "pointer" }}
                  onClick={() => setCreateNewCateForm((prev) => !prev)}
                >
                  {CreateNewCateForm
                    ? "Choose an existing category"
                    : "Create New Category"}
                </p>
              </div>
              <div className="d-flex gap-3">
                <button
                  type="submit"
                  className="btn btn-outline-primary"
                  style={{ height: "fit-content" }}
                >
                  Add Task
                </button>
                <button className="btn btn-outline-danger" onClick={()=>dispatch({type : "hideTaskForm"})}>Cancel</button>
              </div>
          </form>
        </Backdrop>
      </div>
    );
  }
}
