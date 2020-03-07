import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Layout extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { children } = this.props;
    return (
      <>
        <div>{children}</div>
      </>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
