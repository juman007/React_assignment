import { createContext, useState, useEffect } from "react";
import { tasks } from "../assets/tasksData";

export const TaskContext = createContext();

const TaskContextProvider = (props) => {
   const [selectedTask, setSelectedTask] = useState(null);
   // Initialize state from localStorage or use empty arrays as default
   const [taskList, setTaskList] = useState(() => {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
   });

   const [completedTasks, setCompletedTasks] = useState(() => {
      const savedCompletedTasks = localStorage.getItem("completedTasks");
      return savedCompletedTasks ? JSON.parse(savedCompletedTasks) : [];
   });

   // Save taskList and completedTasks to localStorage whenever they change
   useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(taskList));
      localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
   }, [taskList, completedTasks]);

   const saveTasksToLocalStorage = (tasks) => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
   };

   const saveCompletedTasksToLocalStorage = (completedTasks) => {
      localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
   };

   // Toggle task status between "Completed" and "In Progress" based on the index
   const handleToggleCompletion = (taskIndex) => {
      const comTask = taskList[taskIndex];
      console.log(comTask);

      comTask.status =
         comTask.status === "Completed" ? "In Progress" : "Completed";

      if (comTask.status === "Completed") {
         setCompletedTasks((prevTaskList) => [...prevTaskList, comTask]);

         // Remove the completed task from taskList
         setTaskList((prevTaskList) =>
            prevTaskList.filter((task) => task.status !== comTask.status)
         );
      } else {
         setTaskList((prevTaskList) => [...prevTaskList, comTask]);
      }
   };

   const handleDelete = (index) => {
      // Remove the task from the task list
      setTaskList((prevTasks) => {
         const updatedTasks = prevTasks.filter((_, i) => i !== index);
         saveTasksToLocalStorage(updatedTasks); // Save to localStorage
         return updatedTasks;
      });

      // If you are working with separate completed tasks, you should also update them if needed
      setCompletedTasks((prevCompletedTasks) => {
         const updatedCompletedTasks = prevCompletedTasks.filter(
            (_, i) => i !== index
         );
         saveCompletedTasksToLocalStorage(updatedCompletedTasks); // Save updated completedTasks to localStorage
         return updatedCompletedTasks;
      });
   };

   const value = {
      taskList,
      setTaskList,
      completedTasks,
      setCompletedTasks,
      handleToggleCompletion,
      handleDelete,
      saveTasksToLocalStorage,
      selectedTask,
      setSelectedTask,
   };

   return (
      <TaskContext.Provider value={value}>
         {props.children}
      </TaskContext.Provider>
   );
};

export default TaskContextProvider;
