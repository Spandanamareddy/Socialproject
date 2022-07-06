import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import LoginForm from './components/pages/LoginForm';
import RegisterForm from './components/pages/RegisterForm';
import Navbar from './components/pages/Navbar';
import About from './components/pages/AboutUs';
import Profile from './components/pages/ProfilePage';
import { UserProvider } from './Context/userContext';

function App() {
  return (
    <div className="App">
      <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<About />}></Route>
            <Route path="register" element={<RegisterForm />}></Route>
            <Route path="login" element={<LoginForm />}></Route>
            <Route path="profile" element={<Profile />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
