import React, { Component } from 'react';
import { connect } from 'vava';

@connect(({ userModel }) => ({
  userModel
}))
export class App extends Component {

  componentDidMount() {
    const { userModel } = this.props;
    userModel.fetchName();
  }
  
  render() {

    const { userModel } = this.props;
    const { name } = userModel.state;

    return (
      <div>{name}</div>
    );
  }
}
