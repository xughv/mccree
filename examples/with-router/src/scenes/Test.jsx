import React, { Component } from 'react';
import { connect } from 'mccree';

@connect(({ userModel }) => ({
  userModel
}))
export class Test extends Component {

  componentDidMount() {
    const { userModel } = this.props;
    userModel.execEffect();
  }
  
  render() {

    const { userModel } = this.props;
    const { name } = userModel.state;

    return (
      <div>{name}</div>
    );
  }
}
