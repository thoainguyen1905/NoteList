import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import Landing from "./components/layout/Landing";
import AuthContextProvider from "./contexts/AuthContext";
import About from "./views/About";
import PostContextProvider from "./contexts/PostContext";
import CreateNote from "./views/CreatNote";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import Auth from "./views/Auth";
import "./App.css";
import Dashboard from "./views/Dashboard";

function App() {
  return (
    <div className="app">
      <AuthContextProvider>
        <PostContextProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/create" element={<CreateNote/>} />
            <Route path="/register" element={<Auth authRoute="register" />} />
            <Route path="/login" element={<Auth authRoute="login" />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </PostContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
