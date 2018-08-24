import React, { Component } from 'react';
import { connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';


class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubUsername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedIn: '',
      youtube: '',
      instagram: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };

  onSubmit(e) {
    e.preventDefault();
    
    console.log('submit');
  };

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  
  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder='Facebook Profile URL'
            name='facebook'
            icon='fab fa-facebook'
            value={this.state.facebook}
            onChange={this.onChange}
            errors={errors.facebook}
          />
          <InputGroup
            placeholder='LinkedIn URL'
            name='linkedIn'
            icon='fab fa-linkedin'
            value={this.state.linkedIn}
            onChange={this.onChange}
            errors={errors.linkedIn}
          />
          <InputGroup
            placeholder='Instagram URL'
            name='instagram'
            icon='fab fa-instagram'
            value={this.state.instagram}
            onChange={this.onChange}
            errors={errors.instagram}
          />
          <InputGroup
            placeholder='Twitter Profile URL'
            name='twitter'
            icon='fab fa-twitter'
            value={this.state.twitter}
            onChange={this.onChange}
            errors={errors.twitter}
          />
          <InputGroup
            placeholder='YouTube channel URL'
            name='youtube'
            icon='fab fa-youtube'
            value={this.state.youtube}
            onChange={this.onChange}
            errors={errors.youtube}
          />
        </div>
      );
    } ;

    // Select option for status
    const options = [
      {
        label: 'Select Professional Title',
        value: 0
      },
      {
        label: 'Developer',
        value: 'Developer'
      },
      {
        label: 'Junior Developer',
        value: 'Junior Developer'
      },
      {
        label: 'Senior Developer',
        value: 'Senior Developer'
      },
      {
        label: 'Freelancer',
        value: 'Freelancer'
      },
      {
        label: 'Manager',
        value: 'Manager'
      },
      {
        label: 'Student or Learning',
        value: 'Student or Learning'
      },
      {
        label: 'Intern',
        value: 'Intern'
      },
      {
        label: 'Instructor or Teacher',
        value: 'Instructor or Teacher'
      },
      {
        label: 'Engineer',
        value: 'Engineer'
      },
      {
        label: 'Computer Engineer',
        value: 'Computer Engineer'
      },
      {
        label: 'Electrical Engineer',
        value: 'Electrical Engineer'
      },
      {
        label: 'Mechanical Engineer',
        value: 'Mechanical Engineer'
      },
      {
        label: 'Other Engineering',
        value: 'Other Engineering'
      },
      {
        label: 'Other',
        value: 'Other'
      },
    ];
    return (
      <div className='create-profile'>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">Let's get some info to make your profile pop!</p>
              <small className="d-block pb-3">* = Denotes a required field</small>
              <form onSubmit={this.onSubmit}>

                <TextFieldGroup
                placeholder='* Profile Handle'
                name='handle'
                value={this.state.handle}
                onChange={this.onChange}
                errors={errors.handle}
                info="A unique handel for your profile URL. Your full name, company name, nickname, ect."
                />

                <SelectListGroup
                placeholder='* Status'
                name='status'
                value={this.state.status}
                onChange={this.onChange}
                options={options}
                errors={errors.status}
                info="Where are you in your professional career?"
                />

                <TextFieldGroup
                placeholder='Company'
                name='company'
                value={this.state.company}
                onChange={this.onChange}
                errors={errors.company}
                info="Personal or current employer."
                />

                <TextFieldGroup
                placeholder='Website'
                name='website'
                value={this.state.website}
                onChange={this.onChange}
                errors={errors.website}
                info="Personal or professional website."
                />

                <TextFieldGroup
                placeholder='Location'
                name='location'
                value={this.state.location}
                onChange={this.onChange}
                errors={errors.location}
                info="Geographical region, Country, State, City."
                />

                <TextFieldGroup
                placeholder='* Skills'
                name='skills'
                value={this.state.skills}
                onChange={this.onChange}
                errors={errors.skills}
                info="Please enter a commas separated list of professional skills. e.g( HTML,CSS,JavaScript )"
                />

                <TextFieldGroup
                placeholder='GitHub Username'
                name='githubUsername'
                value={this.state.githubUsername}
                onChange={this.onChange}
                errors={errors.githubUsername}
                info="Supplying a GitHub username displays a list of your most recent repo's."
                />

                <TextAreaFieldGroup
                placeholder='Short Bio'
                name='bio'
                value={this.state.bio}
                onChange={this.onChange}
                errors={errors.bio}
                info="Tell us a little about yourself."
                />

                <div className="mb-3">
                  <button onClick={() => {
                    this.setState(prevState => ({
                      displaySocialInputs: !prevState.displaySocialInputs
                    }))
                  }} className="btn btn-light">Add Social Network Links</button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input type="submit" value="Submit" className='btn btn-info btn-block mt-4'/>

              </form>
            </div>
          </div>
        </div>
      </div>
    )
  };
};

CreateProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps)(CreateProfile);
