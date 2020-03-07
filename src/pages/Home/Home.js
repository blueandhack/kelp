import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { connect } from 'react-redux';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { token } = this.props;
    return (
      <div>
        Homepage
        {!token && (
          <div>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/signup">
              <Button type="primary">Sign Up</Button>
            </Link>
          </div>
        )}
        {token && (
          <div>
            <Link to="/logout">
              <Button>Logout</Button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

Home.defaultProps = {
  token: null,
};

Home.propTypes = {
  token: PropTypes.string,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, null)(Home);
