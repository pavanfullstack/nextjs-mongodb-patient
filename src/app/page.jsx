import { dbConnect } from "@/utils/mongoose";
import TaskCard from "@/components/TaskCard";
import Task from "@/models/Task";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";

export const maxDuration = 60;

export const dynamic = "force-dynamic";

export async function loadTasks() {
  await dbConnect();
  const tasks = await Task.find();
  return tasks;
}

export default async function HomePage() {
  const { isAuthenticated } = getKindeServerSession();
  const tasks = await loadTasks();

  return (await isAuthenticated()) ? (
    <div className="py-10">
      <a href="/tasks/new" class="rounded-md bg-indigo-600 px-14 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Patient</a>
    <div className="grid md:grid-cols-3 gap-2 py-10">
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
    </div>
  ) : (
    <>
    <div className="relative isolate px-6 pt-14 lg:px-8">
    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div className="hidden sm:mb-8 sm:flex sm:justify-center">
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">A healthy heart is central to overall good health</h1>
        <p className="mt-6 text-lg leading-8">Stay Healthy Stay Safe</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <span href="#" className="rounded-md bg-indigo-600 px-14 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"><LoginLink postLoginRedirectURL="/">Login</LoginLink></span>
        </div>
      </div>
    </div>
  </div>
</>
  );
}
