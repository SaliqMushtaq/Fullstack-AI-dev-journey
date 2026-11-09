
"use client";
import { useEffect, useState } from "react";

import { createClient } from "../lib/supabase/client";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {
  const supabase = createClient();

  const [tasks, setTasks] = useState<Task[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [loadError, setLoadError] = useState("");
  
useEffect(() => {
  async function fetchTasks() {
    setIsLoading(true);
    setLoadError("");

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setLoadError(error.message);
      setIsLoading(false);
      return;
    }

    setTasks(data as Task[]);
    setIsLoading(false);
  }

  fetchTasks();
}, []);
  const [newTask, setNewTask] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const remainingTasks = tasks.length - completedTasks;

  // Save a new task in Supabase
  async function addTask() {
    const title = newTask.trim();

    if (!title || isSaving) return;

    setIsSaving(true);

    const { data, error } = await supabase
      .from("tasks")
      .insert({ title })
      .select()
      .single();

    if (error) {
      alert("Could not save task: " + error.message);
      setIsSaving(false);
      return;
    }

    setTasks((previousTasks) => [
      ...previousTasks,
      data as Task,
    ]);

    setNewTask("");
    setIsSaving(false);
  }

  // Toggle task completion status in Supabase
 
async function toggleTask(id: number) {
  // Find the task we want to update
  const currentTask = tasks.find((task) => task.id === id);

  if (!currentTask) return;

  // Update the database
  const { data, error } = await supabase
    .from("tasks")
    .update({ completed: !currentTask.completed })
    .eq("id", id)
    .select()
    .single();

  // Handle database errors
  if (error) {
    alert("Could not update task: " + error.message);
    return;
  }

  // Update the frontend after database success
  setTasks((previousTasks) =>
    previousTasks.map((task) =>
      task.id === id ? (data as Task) : task
    )
  );
}

// Delete a task from Supabase 
async function deleteTask(id: number) {
  // Delete the task from Supabase
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id);

  // Handle database errors
  if (error) {
    alert("Could not delete task: " + error.message);
    return;
  }

  // Update the frontend after successful deletion
  setTasks((previousTasks) =>
    previousTasks.filter((task) => task.id !== id)
  );
}


  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white sm:p-10">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <header className="mb-10">
          <p className="text-sm font-medium tracking-widest text-blue-400">
            YOUR WORKSPACE
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            TaskFlow
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your work. Stay productive.
          </p>
        </header>

        {/* Dashboard statistics */}
        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-900 p-6">
            <p className="text-slate-400">Total Tasks</p>
            <h2 className="mt-2 text-3xl font-bold">
              {tasks.length}
            </h2>
          </div>

          <div className="rounded-xl bg-slate-900 p-6">
            <p className="text-slate-400">Completed</p>
            <h2 className="mt-2 text-3xl font-bold text-green-400">
              {completedTasks}
            </h2>
          </div>

          <div className="rounded-xl bg-slate-900 p-6">
            <p className="text-slate-400">Remaining</p>
            <h2 className="mt-2 text-3xl font-bold text-blue-400">
              {remainingTasks}
            </h2>
          </div>
        </section>

        {/* Add task */}
        <section className="mt-8 rounded-xl bg-slate-900 p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Add a New Task
          </h2>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={newTask}
              onChange={(event) =>
                setNewTask(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") addTask();
              }}
              placeholder="What do you need to do?"
              className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
            />

            <button
              onClick={addTask}
              disabled={isSaving || !newTask.trim()}
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Add Task"}
            </button>
          </div>
        </section>

        {/* Task list */}
        <section className="mt-8 rounded-xl bg-slate-900 p-6">
          <h2 className="mb-5 text-xl font-semibold">
            My Tasks
          </h2>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-slate-800 p-4"
              >
                <span
                  className={
                    task.completed
                      ? "text-slate-500 line-through"
                      : "text-white"
                  }
                >
                  {task.title}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="rounded-md bg-green-700 px-3 py-2 text-sm hover:bg-green-600"
                  >
                    {task.completed ? "Undo" : "Complete"}
                  </button>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="rounded-md bg-red-700 px-3 py-2 text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {tasks.length === 0 && (
              <p className="py-6 text-center text-slate-400">
                No tasks yet. Add your first task!
              </p>
            )}
          </div>
        </section>

      </div>
    </main>
  );
}
