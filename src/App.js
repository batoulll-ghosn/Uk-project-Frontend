import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/navbar';
import Header from './components/header';
import Services from './components/services';
import Users from './components/testFetch';
import MiddleSection from './components/MiddleSection';
import Workshops from './components/workshops';
import Testimonial from './components/testimonial'
import Slice from './components/slice';
import Login from './components/login';
import Test from './components/test';
import Register from './components/Register';
import Footer from './components/footer';
import ConferencesPage from './components/conferencesPage';
import CoursesPage from './components/coursesPage';
import WorkshopSection from './components/workshopSection';
import Faq from './components/FAQ';
import AdminDashboard from './components/DashboardComponents/sideBar';
import EmailSender from './components/sendingEmail';
import UserDashboard from './components/UserDashboard/userDashboard';
function App() {
  return (
 
  <div className="App">
     <ToastContainer />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins&display=swap" />
  <Router>
    
   <Routes>
        <Route exact  path="/" element={<><Navbar /><Header /> <Slice /><Test/><MiddleSection /><WorkshopSection/><Testimonial/><Faq/><Footer/></>}/>
       <Route path="/Login" element={ <Login />}/>
       <Route path="/batoul" element={ <Test />}/>
       <Route path="/SignUp" element={ <Register />}/>
       <Route path="/workshops" element={<Workshops/>} />
       <Route path="/conferences" element={<ConferencesPage/>} />
       <Route path="/courses" element={<CoursesPage/>} />
       <Route path="/dashboard" element={<AdminDashboard/>} />
       <Route path="/userdashboard" element={<UserDashboard/>} />
       <Route path="/email" element={<EmailSender/>} />
  </Routes>
  </Router>
  </div>
 
  );
}

export default App;
