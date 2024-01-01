import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Header from './components/header';
import Services from './components/services';
import Auth from './components/login';

function App() {
 return (
  <>  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins&display=swap" />
  <Router>
   <Routes>
       <Route path="/auth" element={ <Auth />}/>
       <Route path="/" element={<> <Navbar/>
         <Header />
        <Services /></>}/>
   </Routes>
   </Router></>
 
 );
}

export default App;
