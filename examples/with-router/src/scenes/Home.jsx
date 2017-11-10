import React, { Component } from 'react';
import { connect, awaitable } from 'vava';

@connect(({ userModel }) => ({
  userModel
}))
export class Home extends Component {

  componentDidMount() {
    this.saveName();
  }

  saveName = async () => {
    const { userModel } = this.props;
    await awaitable(userModel.saveName)('vava');
    console.log('done');
  }
  
  render() {

    const { userModel } = this.props;
    const { name } = userModel.state;

    return (
      <div>{name}</div>
    );
  }
}
