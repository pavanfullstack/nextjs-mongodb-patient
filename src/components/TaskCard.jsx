import Link from "next/link";

export function TaskCard({ task }) {
  return (
    <Link href={`/tasks/${task._id}`}>
      <div className="bg-gray-800 p-10 text-white rounded-md hover:cursor-pointer hover:bg-gray-700">
        <h1 className="text-2xl font-bold">Patinet Name: {task.patientname}</h1>
        <p className="text-slate-300">Age: {task.age}</p>
        <p className="text-slate-300">Sex: {task.sex}</p>
        <p className="text-slate-300">Cholestrol: {task.chol}</p>
        <p className="text-slate-300">Blood Pressure: {task.bp}</p>
        <p className="text-slate-300">Sugar: {task.sugar}</p>
        <p className="text-slate-300">ECG: {task.restecg}</p>
        <p className="text-slate-400 my-2">
          <span className="mr-1">Created at:</span>
          {new Date(task.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}

export default TaskCard;
