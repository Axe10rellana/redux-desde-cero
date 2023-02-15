//react-redux
import { useSelector, useDispatch } from "react-redux";

//react-router-dom
import { Link } from "react-router-dom";

//react-icons
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineCreate, MdOutlineEditNote } from "react-icons/md";
import { FaTasks } from "react-icons/fa";

//sweetalert2
import Swal from "sweetalert2";

//actions
import { deleteTask } from "../features/tasks/taskSlice";

const TaskList = () => {
  //tasks state
  const tasks = useSelector((state) => state.tasks);

  //dispatch
  const dispatch = useDispatch();

  //functions
  const handleDelete = (id) => {
    Swal.fire({
      icon: "error",
      title: "Warning",
      text: "Do you want to remove this task from the task list?",
      showDenyButton: true,
      denyButtonText: "No",
      denyButtonColor: "#3b82f6",
      confirmButtonText: "Yes",
      confirmButtonColor: "#ef4444",
    }).then((response) => {
      if (response.isConfirmed) {
        dispatch(deleteTask(id));
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Task successfully deleted",
          timer: 2000,
          confirmButtonColor: "#22c55e",
        });
      } else if (response.isDenied) {
        return;
      }
    });
  };

  return (
    <div className="w-4/6 select-none">
      <header className="mb-4 flex items-center justify-between rounded-md bg-gray-500 p-4 shadow-md shadow-blue-500">
        <h1 className="text-lg">
          Tasks:{" "}
          <span className="rounded-full bg-blue-500 p-1">{tasks.length}</span>
        </h1>
        <div className="rounded-full bg-blue-500 p-1 text-lg hover:bg-blue-300">
          <Link to="/create-task">
            <MdOutlineCreate />
          </Link>
        </div>
      </header>
      {tasks.length !== 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <div
              className="mb-1 rounded-md bg-blue-500 p-4 capitalize"
              key={task.id}
            >
              <header className="flex justify-between">
                <h3>{task.title}</h3>
                <div className="flex gap-x-2">
                  <button className="rounded-full bg-green-500 p-1 hover:bg-green-300">
                    <Link to={`/edit-task/${task.id}`}>
                      <MdOutlineEditNote />
                    </Link>
                  </button>
                  <button
                    className="rounded-full bg-red-500 p-1 hover:bg-red-300"
                    onClick={() => handleDelete(task.id)}
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </header>
              <p>{task.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center gap-x-4">
          <h2 className="text-center text-lg capitalize">
            The task list is empty
          </h2>
          <FaTasks />
        </div>
      )}
    </div>
  );
};

export default TaskList;
