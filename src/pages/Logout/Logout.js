import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

export class Logout extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { redirectToHome: false };
  }

  componentDidMount = async () => {
    this.setState({ redirectToHome: true });
  };

  componentWillUnmount = async () => {
    const { logout, userUpdate } = this.props;
    logout();
    userUpdate();
  };

  render() {
    const { redirectToHome } = this.state;
    return (
      <div>
        Logout
        <div>Logout Action</div>
        {redirectToHome ? <Redirect to="/" /> : null}
      </div>
    );
  }
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
  userUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(actions.logout());
  },
  userUpdate: () => {
    dispatch(actions.userUpdate(null));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
