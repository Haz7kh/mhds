import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Users from "./components/Users";
import Courses from "./components/Courses";
import Questions from "./components/Questions";
import AdminDashboard from "./components/AdminDashboard";
import UserProfile from "./components/UserProfile";
import AddUser from "./components/AddUser";
import AddCourse from "./components/AddCourse";
import AddQuestion from "./components/AddQuestion";
import EnrollUser from "./components/EnrollUser";
import EditUser from "./components/EditUser";
import NavBar from "./components/NavBar";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/questions/:courseId" element={<Questions />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/admin/add-user" element={<AddUser />} />
          <Route path="/admin/add-course" element={<AddCourse />} />
          <Route path="/admin/add-question" element={<AddQuestion />} />
          <Route path="/admin/enroll-user" element={<EnrollUser />} />
          <Route path="/admin/edit-user/:userId" element={<EditUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
