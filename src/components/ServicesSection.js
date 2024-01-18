import './styles/services.css';
import {useNavigate} from 'react-router-dom';
const Services=()=> {
  const navigate = useNavigate();
  const handleMeetClick=()=>{
    navigate('/theTeam')
  }
  return (
    <div id="services"> <h2 className='the-main-in-services-section-h2'>Learn with the world's experts</h2>
    <div className='the-main-in-services-section'>
       
    <div className='services-mini-one'>
        <div className='leftSide-services-mini-one'><img src='./images/services1.jpeg'/></div>
        <div className='rightSide-services-mini-one'>
        <h3>We help you gain confidence and improve your speaking, pronunciation and vocabulary.</h3>
         
            <ul className='the-list-in-services'>
              <li><span> &#10004;</span>  Practice in small group classes and private one-to-one classes</li>   
                 <li><span> &#10004;</span> Customise your timetable, Choose classes based on your goals and interests.</li>
                <li><span> &#10004;</span>  Choose your level. From beginner to advanced.</li></ul><button className='meet-team-button' onClick={handleMeetClick}>Meet The Team </button>
                </div>
    </div>
    <div className='services-mini-onee'>
        
        <div className='rightSide-services-mini-one'>
        <h3>We help you gain confidence and improve your speaking, pronunciation and vocabulary.</h3>
         
            <ul className='the-list-in-services'>
              <li><span> &#10004;</span>  Practice in small group classes and private one-to-one classes</li>   
                 <li><span> &#10004;</span> Customise your timetable, Choose classes based on your goals and interests.</li>
                <li><span> &#10004;</span>  Choose your level. From beginner to advanced.</li></ul><button className='meet-team-button' onClick={handleMeetClick}>Meet The Team </button> </div>
                <div className='leftSide-services-mini-one'><img src='./images/services2.jpeg'/></div>
    </div>
    </div>
    </div>
  );
}

export default Services;
