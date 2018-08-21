import React, { Component } from 'react';
import moment from 'moment';

class Footer extends Component {
  render() {
    return (
      <footer className="bg-dark text-white mt-5 p-4 text-center">
        Copyright &copy; {moment().format('YYYY')} Dev-Hubb      
        </footer>
    )
  };
};

export default Footer;
