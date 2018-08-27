import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: '72a9a7d1ce5e22876502',
      clientSecret: '149c2e6baa4de81a4b607b468328d96847c11361',
      count: 5,
      sort: 'created: asc',
      repos: [],
    };
  };

  componentDidMount() {
    const { githubUsername } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
      .then(res => res.json())
      .then(data => {
        if(this.refs.myRef) {
          this.setState({
            repos: data
          })
        };
      })
      .catch(err => console.log(err));
  };

  render() {
    const { repos } =this.state;

    const repoItems = repos.map((item) => (
      <div key={item.id} className='card card-body mb-2'>
        <div className="ro">
          <div className="col-md-6">
            <h4>
              <a href={item.html_url} className='text-info' target='_blank'>
                {item.name}
              </a>
            </h4>
            <p>{item.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {item.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {item.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {item.forks_count}
            </span>

          </div>
        </div>
      </div>
    ));
    return (
      <div ref='myRef'>
      <hr/>
      <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    )
  };
};

ProfileGithub.propTypes = {
  githubUsername: PropTypes.string.isRequired
};

export default ProfileGithub;