import React, { Component } from 'react';
import LoginForm from '../../components/Forms/LoginForm/LoginForm';
// import PropTypes from 'prop-types';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div>
        Login
        <div style={{ maxWidth: '800px', margin: 'auto' }}>
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default Login;
