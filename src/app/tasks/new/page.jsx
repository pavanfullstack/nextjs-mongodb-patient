"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const NewTask = () => {
  const [newTask, setNewTask] = useState({
    patientname: "",
    age: "",
    sex: "",
    chol: "",
    bp: "",
    sugar: "",
    restecg: ""
  });
  const params = useParams();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const getTask = async () => {
    const res = await fetch(`/api/tasks/${params.id}`);
    const data = await res.json();
    setNewTask({ patientname: data.patientname, age: data.age, sex: data.sex, chol: data.chol, bp: data.bp, sugar: data.sugar, restecg: data.restecg });
  };

  useEffect(() => {
    if (params.id) {
      getTask();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errs = validate();

    if (Object.keys(errs).length) return setErrors(errs);

    setIsSubmitting(true);

    if (params.id) {
      await updateTask();
    } else {
      await createTask();
    }

    router.push("/");
  };

  const handleChange = (e) =>
    setNewTask({ ...newTask, [e.target.name]: e.target.value });

  const validate = () => {
    let errors = {};

    if (!newTask.patientname) {
      errors.patientname = "Patient Name is required";
    }

    if (!newTask.age) {
      errors.age = "Age is required";
    }

    if (!newTask.sex) {
      errors.sex = "Sex is required";
    }

    if (!newTask.chol) {
      errors.chol = "Chol is required";
    }

    if (!newTask.bp) {
      errors.bp = "BP is required";
    }

    if (!newTask.sugar) {
      errors.sugar = "Sugar is required";
    }

    if (!newTask.restecg) {
      errors.restecg = "Restecg is required";
    }

    return errors;
  };

  const createTask = async () => {
    try {
      await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const res = await fetch(`/api/tasks/${params.id}`, {
          method: "DELETE",
        });
        router.push("/");
        router.refresh();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateTask = async () => {
    try {
      await fetch(`/api/tasks/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <header className="flex justify-between">
          <h1 className="font-bold text-3xl">
            {!params.id ? "Add Patient" : "Update Patient"}
          </h1>
          {params.id && (
            <button
              className="bg-red-500 px-3 py-1 rounded-md"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </header>
        <input
          type="text"
          placeholder="patientname"
          name="patientname"
          onChange={handleChange}
          value={newTask.patientname}
          autoFocus
          className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
        />
        <input 
          type="number"
          placeholder="age"
          name="age"
          onChange={handleChange}
          value={newTask.age}
          className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
        />
        <input
          type="text"
          placeholder="sex"
          name="sex"
          onChange={handleChange}
          value={newTask.sex}
          className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
        />

        <input
          type="number"
          placeholder="chol"
          name="chol"
          onChange={handleChange}
          value={newTask.chol}
          className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
        />

        <input
          type="number"
          placeholder="bp"
          name="bp"
          onChange={handleChange}
          value={newTask.bp}
          className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
        />

        <input
          type="number"
          placeholder="sugar"
          name="sugar"
          onChange={handleChange}
          value={newTask.sugar}
          className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
        />

        <input
          type="number"
          placeholder="restecg"
          name="restecg"
          onChange={handleChange}
          value={newTask.restecg}
          className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
        />

        <button className="bg-green-600 text-white font-semibold px-8 py-2 rounded-lg">
          {params.id ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default NewTask;
