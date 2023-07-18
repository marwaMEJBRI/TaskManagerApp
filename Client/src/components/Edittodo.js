import React, { useState } from "react";
import axios from "axios";

const Edittodo = ({ todoList }) => {
  const [description, setDescription] = useState(todoList.description || '');

  // function delete task to do
  const updateTodo = async (e) => {
    e.preventDefault();
    if (!todoList || !todoList.todo_id) {
      console.error("todoList is undefined or missing todo_id property");
      return;
    }
    try {
      const body = { description };
      const response = await axios.put(
        `http://localhost:5000/updateTodo/${todoList.todo_id}`,
        body,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        console.log("Todo updated successfully");
      } else {
        console.error("Failed to update todo");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target={`#id${todoList.todo_id}`}
      >
        Update
      </button>

      <div
        className="modal fade"
        id={`id${todoList.todo_id}`}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update task
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn btn-success"
                onClick={(e) => { updateTodo(e) }}
              >
                Save update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edittodo;
