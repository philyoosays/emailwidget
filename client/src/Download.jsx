import React from 'react';

import AdminNav from './AdminNav'

export default class Download extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return(
      <AdminNav handleLogout={this.props.handleLogout}/>
    );
  }
}
