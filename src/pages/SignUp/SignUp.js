import React, { Component } from 'react';
import SignUpForm from '../../components/Forms/SignUpForm/SignUpForm';
// import PropTypes from 'prop-types';

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div>
        Sign Up
        <div style={{ maxWidth: '800px', margin: 'auto' }}>
          <SignUpForm />
        </div>
      </div>
    );
  }
}

export default SignUp;
