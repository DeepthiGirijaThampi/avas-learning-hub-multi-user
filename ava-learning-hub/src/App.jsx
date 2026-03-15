// Import routing components from React Router
import { Routes, Route, Navigate } from "react-router";

// Import page components
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Profile from "./components/pages/Profile";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Reflections from "./components/pages/Reflections";
import Subjects from "./components/pages/Subjects";
import Units from "./components/pages/Units";
import Contacts from "./components/pages/Contacts";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
// Import route protection component
import ProtectedRoute from "./components/common/ProtectedRoute";

// Import global app styling
import './App.css'

// Main App component that defines layout and routing
function App() {
  
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/> 
        <Route path="/register" element={<Register/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contacts" element={<Contacts/>}/>

          {/* Protected routes - accessible only when user is logged in */}
        <Route path="/profile" element={<ProtectedRoute>
                                        <Profile/>
                                        </ProtectedRoute>
                                        }/>
        <Route path="/reflections" element={<ProtectedRoute>
                                           <Reflections/>
                                           </ProtectedRoute>}/>
        <Route path="/subjects" element={<ProtectedRoute>
                                          <Subjects/>
                                        </ProtectedRoute>}/>
        <Route path="/units/:subjectId" element={<ProtectedRoute>
                                                  <Units/>
                                                  </ProtectedRoute>}/>
        
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
      <Footer></Footer>
    </div>
  )
}

export default App
