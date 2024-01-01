import Navbar from './components/navbar';
import Header from './components/header';
import Services from './components/services';
import MiddleSection from './components/MiddleSection';
import Slice from './components/slice';
function App() {
  return (
    <>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins&display=swap" />
    <Navbar />
    <Header /> 
    <Slice />
    <Services />
    </>
  );
}

export default App;
