//react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App = () => {
  return (
    <div className="h-screen bg-zinc-900 text-white">
      <div className="flex h-full items-center justify-center overflow-y-scroll">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/create-task" element={<TaskForm />} />
            <Route path="/edit-task/:id" element={<TaskForm />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
