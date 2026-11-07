
"use client";

import { useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Learn Next.js", completed: true },
    { id: 2, title: "Understand TypeScript", completed: false },
    { id: 3, title: "Build TaskFlow", completed: false },
  ]);

  const [newTask, setNewTask] = useState("");

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const remainingTasks = tasks.length - completedTasks;

  function addTask() {
    const title = newTask.trim();

    if (!title) return;

    const task: Task = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTasks((previousTasks) => [...previousTasks, task]);
    setNewTask("");
  }

  function toggleTask(id: number) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id: number) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white sm:p-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <p className="text-sm font-medium tracking-widest text-blue-400">
            YOUR WORKSPACE
          </p>
          <h1 className="mt-2 text-4xl font-bold">TaskFlow</h1>
          <p className="mt-2 text-slate-400">
            Manage your work. Stay productive.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-900 p-6">
            <p className="text-slate-400">Total Tasks</p>
            <h2 className="mt-2 text-3xl font-bold">{tasks.length}</h2>
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

        <section className="mt-8 rounded-xl bg-slate-900 p-6">
          <h2 className="mb-4 text-xl font-semibold">Add a New Task</h2>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={newTask}
              onChange={(event) => setNewTask(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") addTask();
              }}
              placeholder="What do you need to do?"
              className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
            />

            <button
              onClick={addTask}
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium hover:bg-blue-500"
            >
              Add Task
            </button>
          </div>
        </section>

        <section className="mt-8 rounded-xl bg-slate-900 p-6">
          <h2 className="mb-5 text-xl font-semibold">My Tasks</h2>

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
