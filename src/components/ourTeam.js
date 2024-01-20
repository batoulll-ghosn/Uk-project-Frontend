import React, { useState, useRef, useEffect } from 'react';
import './styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const TeamMember = ({ image, name, role, about,flip, videoSrc }) => {
  const [showPopup, setShowPopup] = useState(false);
  const videoRef = useRef(null);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    if (showPopup && videoRef.current) {
      videoRef.current.play();
    }
  }, [showPopup]);

  return (
    <div className="col-xs-12 col-sm-6 col-md-4">
      <div className="image-flip" onTouchStart={() => {}}>
        <div className="mainflip">
          <div className="frontside">
            <div className="card">
              <div className="card-body text-center">
                <p>
                  <img className="img-fluid" src={image} alt="card image" />
                </p>
                <h4 className="card-title">{name}</h4>
                <h4 className="card-title">{role}</h4>
                <p className="card-text">{about}</p>
                <button onClick={togglePopup} className="meetMeInTeam">
                  Meet ME
                </button>
              </div>
            </div>
          </div>
          <div className="backside">
            <div className="card">
              <div className="card-body text-center mt-4">
               
                <h4 className="card-title">{role}</h4>
              
                <p className="card-text">{flip}</p>
                <button onClick={togglePopup} className="meetMeInTeam">
                  Meet ME
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <div  onClick={togglePopup}>
           <div className="Confoverlay" role="document">
          <div className="Conferencepopup">
            <div className="Conferencepopup-content">
                <h5 className="modal-title" id={`${name}ModalLabel`}>{name}'s Video</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={togglePopup}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <video className="video-in-our-team" ref={videoRef} height="auto" controls>
                  <source src={videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Team = () => (
  <>
    <div className="the-header-in-conferences">
      <div className="div-of-logo-in-footer">
        <Link to="/">
          <img src="./images/logo.jpeg" alt="Logo" />
        </Link>
      </div>
      <div>
        <h2 className="the-Our-Conferences">Our Team</h2>
      </div>
    </div>

    <section id="team" className="pb-5">
      <div className="container">
        <div className="row">
          <TeamMember
            image="images/jjj.jpeg"
            name="Josette"
            role="English Teacher"
            about="Level 1"
            videoSrc="images/JosetteVideo.mp4"
            flip="John, an enthusiastic and dedicated English teacher with a passion for unlocking the beauty of language and literature."
    
          />
          <TeamMember
            image="images/jjj.jpeg"
            name="John"
            role="Legal Translation Trainer"
            about="Level 2"
            videoSrc="images/JohnVideo.mp4"
            flip="John, an enthusiastic and dedicated English teacher with a passion for unlocking the beauty of language and literature."
    
          />
          
        </div>
      </div>
    </section>
  </>
);

export default Team;
