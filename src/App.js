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
  <Router>
  <div className="App">
   <Routes>
        <Route path="/" element={<><Navbar /><Header /> <Slice /><Services /></>}/>
       <Route path="/login" element={ <Login />}/>
       <Route path="/batoul" element={ <Test />}/>
       
  </Routes>
  </div>
  </Router>
  );
}

export default App;
