import React from 'react';
import './styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Link} from 'react-router-dom';
const TeamMember = ({ image, name, role, about }) => (
  <div className="col-xs-12 col-sm-6 col-md-4">
    <div className="image-flip" onTouchStart={() => {}}>
      <div className="mainflip">
        <div className="frontside">
          <div className="card">
            <div className="card-body text-center">
              <p>
                <img className="img-fluid" src={image} alt="card image" />
              </p>
              <h4 className="card-title">{name} "{role}"</h4>
              <p className="card-text">{about}</p>
              <a href="#" className="btn btn-primary btn-sm">
                <i className="fa fa-plus"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="backside">
          <div className="card">
            <div className="card-body text-center mt-4">
              <h4 className="card-title">{name} "{role}"</h4>
              <p className="card-text">{about}</p>
              <ul className="list-inline">
                <li className="list-inline-item">
                  <a className="social-icon text-xs-center" target="_blank" href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="social-icon text-xs-center" target="_blank" href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="social-icon text-xs-center" target="_blank" href="#">
                    <i className="fa fa-skype"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="social-icon text-xs-center" target="_blank" href="#">
                    <i className="fa fa-google"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

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
            image="images/person.svg"
            name="team member 1"
            role="p1"
            about="work"
          />
          <TeamMember
            image="images/person.svg"
            name="team member 1"
            role="p1"
            about="work"
          />
          
        </div>
      </div>
    </section>
  </>
);

export default Team;
