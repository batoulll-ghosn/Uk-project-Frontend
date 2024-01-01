import Navbar from './components/navbar';
import Header from './components/header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Services from './components/services';
import MiddleSection from './components/MiddleSection';
import Slice from './components/slice';
import Login from './components/login';

function App() {
  return (
    <>  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins&display=swap" />
  <Router>
   <Routes>
       <Route path="/login" element={ <Login />}/>
       <Route path="/" element={<>
    <Navbar />
    <Header /> 
    <Slice />
    <Services />
    </>}/>
  </Routes>
  </Router>
  </>
  );
}

export default App;
