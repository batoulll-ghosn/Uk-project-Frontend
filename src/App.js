import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
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

import Register from './components/Register';
import Footer from './components/footer';
import ConferencesPage from './components/conferencesPage';
import CoursesPage from './components/coursesPage';
import WorkshopSection from './components/workshopSection';
import Faq from './components/FAQ';
import AdminDashboard from './components/DashboardComponents/sideBar';
import EmailSender from './components/sendingEmail';
import UserDashboard from './components/userDashboard';
import ProtectedRoute from './components/protectedRoute';
import MainDash from './components/mainDashboard';
import Servicess from './components/ServicesSection';
import OurTeam from './components/ourTeam';
import Conference from './components/Conference';
import Course from './components/Course';
import Workshop from './components/Workshop';
import {getUserID,getUserRole } from './Data/getData';

function App() {
  const id = getUserID();
  const role = getUserRole();
  return (
  <div className="App">
     <ToastContainer />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins&display=swap" />
  <Router>
    
   <Routes>
       <Route exact  path="/" element={<><Header /> <Slice /><Servicess/><MiddleSection /><WorkshopSection/><Testimonial/><Faq/><Footer/></>}/>
       <Route path="/Login" element={ <Login />}/>
       <Route path="/SignUp" element={ <Register />}/>
       <Route path="/workshops" element={<Workshops/>} />
       <Route path="/conferences" element={<ConferencesPage/>} />
       <Route path="/courses" element={<CoursesPage/>} />
       <Route path="/dashboard" element={<AdminDashboard/>} />
       <Route path="/userdashboard" element={<UserDashboard/>} />
       <Route path="/.email" element={<EmailSender/>} />
       <Route path="/conference/:id" element={<Conference/>}/>
       <Route path="/course/:id" element={<Course/>}/>
       <Route path="/workshop/:id" element={<Workshop/>}/>
      <Route path="/theTeam" element={<OurTeam/>}/>
       <Route
            path="/dash/*"
            element={
              <ProtectedRoute>
                <MainDash />
              </ProtectedRoute>
            }
          />
  </Routes>
  </Router>
  </div>
 
  );
}

export default App;
