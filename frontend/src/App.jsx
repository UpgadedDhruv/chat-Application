import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login.jsx";
import SignUp from "./pages/signup/SignUp.jsx";
import Home from "./pages/Home/Home.jsx";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext.jsx";

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <SignUp />} // if chat-user data (authUser m uska instance le rkha h) is present in local storage then redirect to home page.
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
// enhance searchInput like whatsapp do 
//sorting or conversations based on newest chat like in whatsapp 
//gave users previlage to upload profile pic .