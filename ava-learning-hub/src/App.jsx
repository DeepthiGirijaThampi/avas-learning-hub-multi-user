import { Routes, Route, Navigate } from "react-router";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Profile from "./components/pages/Profile";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Reflections from "./components/pages/Reflections";
import Subjects from "./components/pages/Subjects";
import Units from "./components/pages/Units";
import Contacts from "./components/pages/Contacts";
import './App.css'
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import ProtectedRoute from "./components/common/ProtectedRoute";
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
