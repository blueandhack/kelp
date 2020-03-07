import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import KelpRoutes from './routes';
import * as actions from './store/actions';
import Layout from './helper/Layout/Layout';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { loading: true };
  }

  componentDidMount = async () => {
    const {
      token,
      refreshToken,
      getCurrentUser,
      getRefreshToken,
      authFail,
    } = this.props;
    // if has token to check current user
    if (token !== null) {
      try {
        await getCurrentUser();
      } catch (error) {
        // refresh token or not
        console.log('token expires, refresh token');
        if (
          error.graphQLErrors.length > 0 &&
          error.graphQLErrors[0].message === 'please login'
        ) {
          try {
            await getRefreshToken(refreshToken);
            await getCurrentUser();
          } catch (err) {
            console.log('refresh failed, just logout');
            authFail(err);
          }
        } else {
          authFail(error);
        }
      }
    }
    await this.setState({ loading: false });
  };

  render() {
    const { token } = this.props;
    const { loading } = this.state;
    const routes = KelpRoutes(token);
    return <>{loading === false && <Layout>{routes}</Layout>}</>;
  }
}

App.defaultProps = {
  token: null,
  refreshToken: null,
};

App.propTypes = {
  token: PropTypes.string,
  refreshToken: PropTypes.string,
  getCurrentUser: PropTypes.func.isRequired,
  getRefreshToken: PropTypes.func.isRequired,
  authFail: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  refreshToken: state.auth.refreshToken,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => dispatch(actions.getCurrentUser()),
  getRefreshToken: (oldRefreshToken) =>
    dispatch(actions.refreshToken(oldRefreshToken)),
  authFail: (error) => dispatch(actions.authFail(error)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
