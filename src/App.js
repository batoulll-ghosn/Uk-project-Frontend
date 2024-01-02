import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Header from './components/header';
import Services from './components/services';
import MiddleSection from './components/MiddleSection';
import Slice from './components/slice';
import Login from './components/login';
import Test from './components/test';
function App() {
  return (
 
  <div className="App">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins&display=swap" />
  <Router>
   <Routes>
        <Route exact  path="/" element={<><Navbar /><Header /> <Slice /><Services /></>}/>
       <Route path="/Login" element={ <Login />}/>
       <Route path="/batoul" element={ <Test />}/>
       
  </Routes>
  </Router>
  </div>
 
  );
}

export default App;
