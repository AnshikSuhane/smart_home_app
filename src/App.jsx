import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Routine from "./pages/Routines";
import Energy from "./pages/Energy";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";


function App() {
  return (
    <Sidebar>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/routines" element={<Routine />} />
        <Route path="/energy" element={<Energy />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </Sidebar>
  );
}

export default App;
