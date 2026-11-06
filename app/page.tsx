
export default function Home() {
  const tasks = [
    { id: 1, title: "Learn Next.js", status: "Completed" },
    { id: 2, title: "Understand TypeScript", status: "In Progress" },
    { id: 3, title: "Build TaskFlow dashboard", status: "Pending" },
  ];

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const remainingTasks = tasks.length - completedTasks;

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <p className="text-sm text-slate-400">YOUR WORKSPACE</p>
          <h1 className="mt-2 text-3xl font-bold">TaskFlow</h1>
          <p className="mt-2 text-slate-400">
            Manage your work. Stay productive.
          </p>
        </header>

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

        <section className="mt-10 rounded-xl bg-slate-900 p-6">
          <h2 className="mb-5 text-xl font-semibold">My Tasks</h2>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between rounded-lg bg-slate-800 p-4"
              >
                <span>{task.title}</span>
                <span className="text-sm text-blue-400">
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
      