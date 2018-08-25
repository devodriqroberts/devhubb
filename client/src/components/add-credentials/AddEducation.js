import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addEducation } from '../../actions/profileActions';
//import isEmpty from '../../validation/is-empty';


class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: '',
      degree: '',
      fieldOfStudy:'',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  };

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    };
  };

  onSubmit(e) {
    e.preventDefault();
    
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldOfStudy: this.state.fieldOfStudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addEducation(eduData, this.props.history);
    console.log('Add education submitted')
  };

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current,
    });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="section add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">Tell us about your education</p>
              <small className="d-block pb-3">* = required field</small>

              <form onSubmit={this.onSubmit}>

                <TextFieldGroup 
                placeholder='* Institution'
                name='school'
                value={this.state.school}
                onChange={this.onChange}
                errors={errors.school}
                />

                <TextFieldGroup 
                placeholder='* Degree'
                name='degree'
                value={this.state.degree}
                onChange={this.onChange}
                errors={errors.degree}
                />

                <TextFieldGroup 
                placeholder='* Field Of Study'
                name='fieldOfStudy'
                value={this.state.fieldOfStudy}
                onChange={this.onChange}
                errors={errors.fieldOfStudy}
                />

                <h6>Start Date</h6>
                <TextFieldGroup 
                placeholder='* Start Date'
                name='from'
                type='date'
                value={this.state.from}
                onChange={this.onChange}
                errors={errors.from}
                />

                <h6>End Date</h6>
                <TextFieldGroup 
                placeholder=' End Date'
                name='to'
                type='date'
                value={this.state.to}
                onChange={this.onChange}
                errors={errors.to}
                disabled={this.state.disabled ? 'disabled' : ''}
                />

                <div className="form-check mb-4">
                  <input 
                  type="checkbox" 
                  name="current" 
                  className='form-check-input'
                  value={this.state.current}
                  checked={this.state.current}
                  onChange={this.onCheck}
                  id='current'
                  />
                  <label htmlFor='current' className='form-check-label'>Currently Attending</label>
                </div>

                <TextAreaFieldGroup 
                name='description'
                placeholder='Education Focus Description'
                value={this.state.description}
                onChange={this.onChange}
                info='List relevant course work.'
                errors={errors.description}
                />
            
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  };
};

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));
