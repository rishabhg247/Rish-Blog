import {Route,Routes} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex justfy-center items-center">
      <div className="">
      <Navbar/>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/post/:id" element={<Single />}/>
        <Route path="/write" element={<Write />} />
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
      <Footer/>
      </div>
    </div>
  );
}

export default App;
