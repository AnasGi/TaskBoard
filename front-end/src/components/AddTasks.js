import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "@clerk/clerk-react";
import GetCategories from "../hooks/GetCategories";
import toast, { Toaster } from "react-hot-toast";
import TextField from "@mui/material/TextField";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function AddTasks() {
  const [description, setDescription] = useState("");
  const [nameCategory, setNameCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("green");
  const [CreateNewCateForm, setCreateNewCateForm] = useState(false);
  const { userId } = useAuth();

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
      } else if(selectedCategory !== "" && selectedCategory !== "all") {
        axios.post("http://localhost:8000/api/categories", {
          nameCategory: newCategory,
          color: newCategoryColor,
          userId: userId,
        });

      }
    }

    let newTask

    if(selectedCategory === ""){
      newTask = {
        description,
        nameCategory: "all",
        createdAt: new Date(),
        userId,
      };
    }
    else{
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
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="d-flex gap-3">

            <div >
              <TextField
              id="outlined-basic"
              label="Enter new Task"
              variant="outlined"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            </div>
            <div >
              {
                CreateNewCateForm ?
                <div className="d-flex gap-2">
                  <TextField
                    style={{width:"150px"}}
                    type="color"
                    id="outlined-basic"
                    variant="outlined"
                    label="Category color"
                    defaultValue={'#008000'}
                    onChange={(e) => setNewCategoryColor(e.target.value)}
                  />
              <TextField
              id="outlined-basic"
              label="Enter new category name"
              variant="outlined"
              onChange={(e) => setNewCategory(e.target.value)}
              value={newCategory}
              required
            />
                </div>
                :
                <FormControl style={{width:"300px"}}>
                  <InputLabel id="demo-simple-select-label">Choose an existing category</InputLabel>
                  <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Choose an existing category"
                    onChange={(e) => {setNameCategory(e.target.value) ; setNewCategory('')}}
                  >
                    {categories.filter(cteg=>cteg.userId === userId).map((category) => (
                      <MenuItem key={category._id} value={category.nameCategory}>
                        {category.nameCategory}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              }
              <p
                className="text-body-secondary text-decoration-underline"
                style={{ textAlign: "right", cursor: "pointer" }}
                onClick={() => setCreateNewCateForm((prev) => !prev)}
              >
                {CreateNewCateForm ? "Choose an existing category" : "Create New Category"}
              </p>
            </div>
          <div className="d-flex align-items-start">
            <button type="submit" className="btn btn-dark" style={{height:'fit-content'}}>
              Add Task
            </button>
          </div>
          </div>
        </form>
      </div>
    );
  }
}
