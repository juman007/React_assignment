export const tasks = [
   {
      heading: "Design Homepage",
      description:
         "Create a clean and responsive homepage layout, including a header, hero section, featured products, and footer.",
      status: "Completed",
      priority: "Medium",
      dueDate: "2024-10-30",
      startDate: "2024-11-20",
      endDate: "2024-11-20",
   },
];

// Save the tasks data to localStorage
localStorage.setItem("tasks", JSON.stringify(tasks));
