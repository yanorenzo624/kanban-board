import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TasksPage from "./pages/TasksPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Temporary default route */}
        <Route path="/" element={<Navigate to="/tasks" replace />} />

        {/* Kanban */}
        <Route path="/tasks" element={<TasksPage />} />

        {/* 404 fallback */}
        <Route
          path="*"
          element={<p className="p-4">Page not found</p>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
