import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
import PropTypes from 'prop-types';
class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    // Get users first name
    const firstName = profile.user.name.trim().split(' ')[0];

    // Sill list 
    const skills = profile.skills.map((skill, index) => (
      <div key={index} className='p-3'>
      <i className="fa fa-check" /> {skill}
      </div>
      
    ));

    return (
      <div className="row">
            <div className="col-md-12">
              <div className="card card-body bg-light mb-3">
                <h3 className="text-center text-info">{firstName}'s Bio</h3>
                <p className="lead text-center">{isEmpty(profile.bio) ? (<small>{firstName} does not have bio.</small>): profile.bio}</p>
                <hr />
                <h3 className="text-center text-info">Skill Set</h3>
                <div className="row">
                  <div className="d-flex flex-wrap justify-content-center align-items-center">
                    {skills}
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
  };
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
