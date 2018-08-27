import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
import moment from 'moment';
//import PropTypes from 'prop-types';

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;

    // List experiences
    const experienceList = experience.map((exp, index) => (
    
      <div key={index}>
        <li className="list-group-item">
          <h4>{exp.company}</h4>

          <p>
          {moment(exp.from).format('MM/YYYY')} - {(exp.current ? <span>Current</span> : isEmpty(exp.to) ? <span>Current</span> : <span>{moment(exp.to).format('MM/YYYY')}</span>)}
          </p>

          <p>
            <strong>Position: </strong>{exp.title}
          </p>
          
            {!isEmpty(exp.location) && <p><strong>Location:</strong> {exp.location}</p>}
            {!isEmpty(exp.description) && <p><strong>Description:</strong> {exp.description}</p>}
          
        </li>
      </div>

    ));

    // List education
    const educationList = education.map((edu, index) => (
    
      <div key={index}>
        <li className="list-group-item">
          <h4>{edu.school}</h4>
          <p>
          {moment(edu.from).format('MM/YYYY')} - {(edu.current ? <span>Current</span> : isEmpty(edu.to) ? <span>Current</span> : <span>{moment(edu.to).format('MM/YYYY')}</span>)}
          </p>
          <p>
            <strong>Degree: </strong>{edu.degree}
          </p>
          <p>
            <strong>Field Of Study: </strong>{edu.fieldOfStudy}
          </p>
          
            {!isEmpty(edu.description) && <p><strong>Description: </strong> {edu.description}</p>}
          
        </li>
      </div>

    ));
    return (
      <div className="row">
            <div className="col-md-6">
              <h3 className="text-center text-info">Experience</h3>
              {experienceList.length > 0 ? (
                <ul className="list-group">
                  {experienceList}
                </ul>
              ) : (
                <p className="text-center">No Experiences Listed</p>
              )}
            </div>

            <div className="col-md-6">
              <h3 className="text-center text-info">Education</h3>
              {educationList.length > 0 ? (
                <ul className="list-group">
                    {educationList}
                </ul>
              ) : (
                <p className="text-center">No Education Listed</p>
              )}
            </div>
          </div>
          
    )
  };
};

export default ProfileCreds;