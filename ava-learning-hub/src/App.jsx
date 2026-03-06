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
function App() {
  
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/reflections" element={<Reflections/>}/>
        <Route path="/subjects" element={<Subjects/>}/>
        <Route path="/units/:subjectId" element={<Units/>}/>
        <Route path="/contacts" element={<Contacts/>}/>
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
      <Footer></Footer>
    </div>
  )
}

export default App
