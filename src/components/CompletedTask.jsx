import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const CompletedTask = () => {
   const { completedTasks, setSelectedTask, handleDelete } =
      useContext(TaskContext);

   return (
      <div>
         <h1 className="text-xl text-blue-600 font-semibold my-5">
            <i className="fa-solid fa-list-check"></i> Completed Tasks
         </h1>
         <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {completedTasks.map((taskData, index) => (
               <div
                  key={index}
                  className="bg-blue-100 w-full lg:max-w-[20vw] px-5 py-5 rounded-md shadow-md flex flex-col cursor-pointer hover:scale-105 duration-300 transition-all ease-in-out"
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
                     <div className="flex gap-2 items-center">
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
         </div>
      </div>
   );
};

export default CompletedTask;
