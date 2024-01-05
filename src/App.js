import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/navbar';
import Header from './components/header';
import Services from './components/services';
import Users from './components/testFetch';
import MiddleSection from './components/MiddleSection';
import Slice from './components/slice';
import Login from './components/login';
import Test from './components/test';
import Register from './components/Register';
function App() {
  return (
 
  <div className="App">
     <ToastContainer />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins&display=swap" />
  <Router>
    
   <Routes>
        <Route exact  path="/" element={<><Navbar /><Header /> <Slice /><Services /><MiddleSection /></>}/>
       <Route path="/Login" element={ <Login />}/>
       <Route path="/batoul" element={ <Test />}/>
       <Route path="/SignUp" element={ <Register />}/>
  </Routes>
  </Router>
  </div>
 
  );
}

export default App;
