//react
import { useState, useEffect } from "react";

//react-redux
import { useDispatch, useSelector } from "react-redux";

//react-router-dom
import { useNavigate, useParams } from "react-router-dom";

//react-icons
import { AiOutlineSave } from "react-icons/ai";

//uuid
import { v4 as uuid } from "uuid";

//actions
import { addTask, editTask } from "../features/tasks/taskSlice";

const TaskForm = () => {
  //state variables
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  //dispatch
  const dispatch = useDispatch();

  //tasks state
  const tasks = useSelector((state) => state.tasks);

  //navigate
  const navigate = useNavigate();

  //params
  const params = useParams();

  //functions
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (params.id) {
      dispatch(editTask(task));
    } else {
      dispatch(
        addTask({
          ...task,
          id: uuid(),
        })
      );
    }

    navigate("/");
  };

  //useEffect
  useEffect(() => {
    if (params.id) {
      setTask(tasks.find((task) => task.id === params.id));
    }
  }, [params.id, tasks]);

  return (
    <form
      className="max-w-sm select-none bg-zinc-800 p-4"
      onSubmit={handleSubmit}
    >
      <label htmlFor="title" className="mb-2 block text-xs font-bold">
        Title:
      </label>
      <input
        className="mb-2 w-full rounded-md bg-zinc-600 p-2"
        type="text"
        id="title"
        name="title"
        placeholder="Title"
        autoComplete="off"
        onChange={handleChange}
        value={task.title}
        required
      />
      <label htmlFor="description" className="mb-2 block text-xs font-bold">
        Description:
      </label>
      <textarea
        className="mb-2 w-full resize-none rounded-md bg-zinc-600 p-2"
        id="description"
        name="description"
        placeholder="Description"
        onChange={handleChange}
        value={task.description}
        required
      ></textarea>
      <button className="bg-green-500 p-1 hover:bg-green-300">
        <AiOutlineSave />
      </button>
    </form>
  );
};

export default TaskForm;
