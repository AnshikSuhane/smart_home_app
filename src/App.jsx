import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Routine from "./pages/Routines";
import Energy from "./pages/Energy";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Register from "./Authentication/Register";
import Login from "./Authentication/login";
import { useEffect, useState } from "react";
import { auth } from "./Authentication/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Home from './components/Home';
import Footer from "./components/Footer";
import { ThemeProviderWrapper } from "./Theme/Theme";
// import Profile from "./pages/Profile";
// import About from './pages/About';
// import Contact from './pages/Contact';
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ThemeProviderWrapper>

    <Router>
      <div>
        {user && <Sidebar />}
        <div>
          <Routes>
            <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/routines" element={user ? <Routine /> : <Navigate to="/" />} />
            <Route path="/energy" element={user ? <Energy /> : <Navigate to="/" />} />
            <Route path="/settings" element={user ? <Settings /> : <Navigate to="/" />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
            {/* <Route path="/about" element={user ? <About /> : <Navigate to="/login" />} /> */}
            
          </Routes>
          <ToastContainer />
        </div>
        <Footer />
      </div>
    </Router>
    </ThemeProviderWrapper>
  );
}

export default App;