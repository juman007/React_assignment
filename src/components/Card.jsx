import React, { useContext, useEffect, useState } from "react";
import CompletedTask from "./CompletedTask";
import { TaskContext } from "../context/TaskContext";

const Card = () => {
   const {
      taskList,
      setTaskList,
      handleToggleCompletion,
      handleDelete,
      saveTasksToLocalStorage,
      selectedTask,
      setSelectedTask,
   } = useContext(TaskContext);

   const [heading, setHeading] = useState("");
   const [description, setDescription] = useState("");
   const [priority, setPriority] = useState("");
   const [dueDate, setDueDate] = useState("");
   const [startDate, setStartDate] = useState("");
   const [endDate, setEndDate] = useState("");

   const handleFormSubmit = (e) => {
      e.preventDefault();

      const currentDate = new Date().toISOString().split("T")[0];
      let taskStatus = "Not Started"; // Default status

      if (startDate <= currentDate && currentDate <= endDate) {
         taskStatus = "In Progress";
      } else if (currentDate > endDate) {
         taskStatus = "Completed";
      }

      const newTask = {
         heading,
         description,
         status: taskStatus,
         priority,
         dueDate,
         startDate,
         endDate,
      };

      setTaskList((prevTasks) => {
         const updatedTasks = [...prevTasks, newTask];
         saveTasksToLocalStorage(updatedTasks); // Save to localStorage
         return updatedTasks;
      });

      // Reset the form
      setHeading("");
      setDescription("");
      setPriority("");
      setDueDate("");
      setStartDate("");
      setEndDate("");

      document.getElementById("my_modal_5").close();
   };

   return (
      <>
         <h1 className="text-xl text-blue-600 font-semibold mb-5">
            <i className="fa-solid fa-list-check"></i> My Tasks
         </h1>
         <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {taskList.map((taskData, index) => (
               <div
                  key={index}
                  className=" bg-white w-full lg:max-w-[20vw] px-5 py-5 rounded-md shadow-md flex flex-col cursor-pointer hover:scale-105 duration-300 transition-all ease-in-out"
               >
                  <div
                     onClick={() => {
                        setSelectedTask(taskData);
                        document.getElementById("my_modal_6").showModal();
                     }}
                  >
                     <h1 className="text-lg font-bold">{taskData.heading}</h1>
                     <p className="text-sm text-gray-600  ">
                        {taskData.description}
                     </p>
                  </div>
                  <div
                     onClick={() => {
                        setSelectedTask(taskData);
                        document.getElementById("my_modal_6").showModal();
                     }}
                     className="flex-grow mt-5"
                  ></div>
                  <div className="flex justify-between">
                     <div
                        onClick={() => handleToggleCompletion(index)}
                        className="flex gap-2 items-center"
                     >
                        <p
                           className={`text-xs font-semibold cursor-pointer
                  ${
                     taskData.status === "Completed"
                        ? "text-green-600"
                        : taskData.status === "In Progress"
                        ? "text-blue-600"
                        : "text-gray-600"
                  }`}
                        >
                           {taskData.status}{" "}
                           {taskData.status === "Completed" ? (
                              <i className="fa-solid fa-circle-check"></i>
                           ) : (
                              <i className="fa-regular fa-circle"></i>
                           )}
                        </p>
                        <span className="text-xs ml-5 text-pink-500 font-semibold">
                           {taskData.dueDate}
                        </span>
                     </div>
                     <div className="flex justify-between items-center gap-2">
                        <p
                           className={`cursor-pointer text-xs ${
                              taskData.priority === "Low"
                                 ? "text-green-600"
                                 : taskData.priority === "Medium"
                                 ? "text-yellow-600"
                                 : "text-red-600"
                           } font-semibold`}
                        >
                           {taskData.priority}
                        </p>
                        <p
                           className="cursor-pointer"
                           onClick={() => handleDelete(index)}
                        >
                           <i className="fa-solid fa-trash text-red-500 text-xs"></i>
                        </p>
                     </div>
                  </div>
               </div>
            ))}

            <div className="bg-white w-full lg:max-w-[20vw] min-h-[180px] px-5 py-5 rounded-md shadow-md hover:scale-105 duration-300 transition-all ease-in-out">
               <div
                  onClick={() =>
                     document.getElementById("my_modal_5").showModal()
                  }
                  className="w-full h-full m-auto flex justify-center items-center border-2 border-dashed border-gray-400 rounded-lg hover:border-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
               >
                  <p className="text-lg text-gray-600">Add a new task</p>
               </div>
            </div>

            {/* Add Task Modal */}
            <dialog
               id="my_modal_5"
               className="modal modal-bottom sm:modal-middle"
            >
               <div className="modal-box">
                  <h3 className="font-bold text-lg text-center">Add Task</h3>
                  <form className="space-y-4" onSubmit={handleFormSubmit}>
                     {/* Form Fields */}
                     <div>
                        <label
                           htmlFor="task-heading"
                           className="block text-sm font-medium text-gray-700 mb-2"
                        >
                           Task Heading
                        </label>
                        <input
                           type="text"
                           id="task-heading"
                           name="heading"
                           className="w-full px-4 py-2 border rounded-md"
                           placeholder="Enter task heading"
                           value={heading}
                           onChange={(e) => setHeading(e.target.value)}
                           required
                        />
                     </div>
                     <div>
                        <label
                           htmlFor="task-description"
                           className="mb-2 block text-sm font-medium text-gray-700"
                        >
                           Task Description
                        </label>
                        <textarea
                           id="task-description"
                           name="description"
                           className="w-full px-4 py-2 border rounded-md"
                           placeholder="Enter task description"
                           rows="4"
                           value={description}
                           onChange={(e) => setDescription(e.target.value)}
                           required
                        />
                     </div>
                     <div>
                        <label
                           htmlFor="start-date"
                           className="mb-2 block text-sm font-medium text-gray-700"
                        >
                           Start Date
                        </label>
                        <input
                           type="date"
                           id="start-date"
                           name="startDate"
                           className="w-full px-4 py-2 border rounded-md"
                           value={startDate}
                           onChange={(e) => setStartDate(e.target.value)}
                           required
                        />
                     </div>
                     <div>
                        <label
                           htmlFor="end-date"
                           className="mb-2 block text-sm font-medium text-gray-700"
                        >
                           End Date
                        </label>
                        <input
                           type="date"
                           id="end-date"
                           name="endDate"
                           className="w-full px-4 py-2 border rounded-md"
                           value={endDate}
                           onChange={(e) => setEndDate(e.target.value)}
                           required
                        />
                     </div>
                     <div>
                        <label
                           htmlFor="priority"
                           className="mb-2 block text-sm font-medium text-gray-700"
                        >
                           Priority
                        </label>
                        <select
                           id="priority"
                           name="priority"
                           className="w-full px-4 py-2 border rounded-md"
                           value={priority}
                           onChange={(e) => setPriority(e.target.value)}
                           required
                        >
                           <option value="High">High</option>
                           <option value="Medium">Medium</option>
                           <option value="Low">Low</option>
                        </select>
                     </div>
                     <div>
                        <label
                           htmlFor="due-date"
                           className="mb-2 block text-sm font-medium text-gray-700"
                        >
                           Due Date
                        </label>
                        <input
                           type="date"
                           id="due-date"
                           name="dueDate"
                           className="w-full px-4 py-2 border rounded-md"
                           value={dueDate}
                           onChange={(e) => setDueDate(e.target.value)}
                           required
                        />
                     </div>

                     <div className="modal-action">
                        <button type="submit" className="btn btn-primary">
                           Add Task
                        </button>
                        <button
                           type="button"
                           className="btn btn-secondary"
                           onClick={() =>
                              document.getElementById("my_modal_5").close()
                           }
                        >
                           Cancel
                        </button>
                     </div>
                  </form>
               </div>
            </dialog>

            <dialog
               id="my_modal_6"
               className="modal modal-bottom sm:modal-middle"
            >
               <div className="modal-box">
                  <h3 className="font-bold text-lg text-center">
                     {selectedTask ? selectedTask.heading : "Loading..."} <br />
                     <span className="text-xs text-red-500">
                        Due Date: {selectedTask?.dueDate}
                     </span>
                  </h3>
                  <p className="py-4">
                     {selectedTask
                        ? selectedTask.description
                        : "Please wait..."}
                  </p>

                  <div className="flex justify-between bg-green-100 px-2 py-1">
                     <p className="text-red-500 text-sm font-semibold">
                        <span className="text-blue-800">Status: </span>
                        {selectedTask?.status}
                     </p>
                     <p className="text-red-500 text-sm font-semibold">
                        <span className="text-blue-800">Priority:</span>{" "}
                        {selectedTask?.priority}
                     </p>
                  </div>
                  <div className="flex justify-between bg-red-100 px-2 py-1 mt-5">
                     <p className="text-red-500 text-sm font-semibold">
                        <span className="text-blue-800">Start Date: </span>
                        {selectedTask?.startDate}
                     </p>
                     <p className="text-red-500 text-sm font-semibold">
                        <span className="text-blue-800">End Date:</span>{" "}
                        {selectedTask?.endDate}
                     </p>
                  </div>

                  <div className="modal-action">
                     <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                     </form>
                  </div>
               </div>
            </dialog>
         </div>
         <CompletedTask />
      </>
   );
};

export default Card;
