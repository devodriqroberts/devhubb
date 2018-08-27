import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      postSubmitted: false,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };

  
  componentWillReceiveProps(newProps) {
    if(newProps.errors) {
      this.setState({
        errors: newProps.errors
      });
    };
  };
  
  onSubmit(e) {
    e.preventDefault();
    this.setState({
      postSubmitted: true
    });
    
    const { user } = this.props.auth;
    
    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar,
    };
    
    this.props.addPost(newPost);
    this.setState({
      text: '',
      errors: {}
    });
    setTimeout(() => (this.setState({
      postSubmitted: false
    })), 3000);
    console.log('Post submitted')
  };
  
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { errors, postSubmitted } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Say Somthing...
          </div>
          <div className="card-body">

            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup 
                placeholder='Create a post'
                value={this.state.text}
                name='text'
                onChange={this.onChange}
                errors={errors.text}
                />
                {postSubmitted && <p>Post submitted!</p>}
              </div>
              <button type="submit" className="btn btn-dark">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  };
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});


export default connect(mapStateToProps, { addPost })(PostForm);
