import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";

const Navbar = () => {
   const { taskList, setSelectedTask, handleDelete } = useContext(TaskContext);
   const [searchQuery, setSearchQuery] = useState(""); // State to manage search query
   const [filteredTasks, setFilteredTasks] = useState(taskList); // State for filtered tasks

   // Update filtered tasks based on search query
   const handleSearch = (e) => {
      const query = e.target.value;
      setSearchQuery(query);

      // Filter taskList based on the search query
      const filtered = taskList.filter((task) =>
         task.heading.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTasks(filtered);
   };

   const handleModalOpen = () => {
      if (searchQuery.trim() !== "") {
         document.getElementById("my_modal_4").showModal();
      }
   };

   return (
      <>
         <div className="w-[90vw] h-12 m-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-red-500">Task Manager</h1>
            <div className="flex items-center gap-8">
               <div className="flex rounded-md border-2 border-green-500 overflow-hidden max-w-md font-sans">
                  <input
                     type="text"
                     placeholder="Search task..."
                     className="w-full outline-none bg-white text-green-600 text-sm px-4 py-1.5"
                     value={searchQuery}
                     onChange={handleSearch} // Update search query on input change
                  />
                  <button
                     onClick={handleModalOpen} // Open modal only if the search query is not empty
                     type="button"
                     className="bg-green-600 flex items-center justify-center px-5"
                     disabled={searchQuery.trim() === ""} // Disable button if input is empty
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 192.904 192.904"
                        width="16px"
                        className="fill-white"
                     >
                        <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z" />
                     </svg>
                  </button>
               </div>
            </div>
         </div>

         {/* Modal */}
         <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
               <h3 className="font-bold text-lg mb-5 ">Search results</h3>
               <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredTasks.length > 0 ? (
                     filteredTasks.map((taskData, index) => (
                        <div
                           key={index}
                           className="bg-blue-100 w-full lg:max-w-[20vw] px-5 py-5 rounded-md shadow-md flex flex-col cursor-pointer"
                        >
                           <div
                              onClick={() => {
                                 setSelectedTask(taskData);
                                 document
                                    .getElementById("my_modal_6")
                                    .showModal();
                              }}
                           >
                              <h1 className="text-lg font-bold">
                                 {taskData.heading}
                              </h1>
                              <p className="text-sm text-gray-600  ">
                                 {taskData.description}
                              </p>
                           </div>
                           <div
                              onClick={() => {
                                 setSelectedTask(taskData);
                                 document
                                    .getElementById("my_modal_6")
                                    .showModal();
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
                     ))
                  ) : (
                     <p className="text-center">No tasks found</p>
                  )}
               </div>
               <div className="modal-action">
                  <form method="dialog">
                     <button className="btn">Close</button>
                  </form>
               </div>
            </div>
         </dialog>
      </>
   );
};

export default Navbar;
