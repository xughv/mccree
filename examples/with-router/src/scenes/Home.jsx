import React, { Component } from 'react';
import { connect } from 'mccree';

@connect(({ userModel }) => ({
  userModel
}))
export class Home extends Component {

  handleClick = async () => {
    const { userModel } = this.props;
    const names = [
      'McCree',
      'Bastion',
      'Mei',
      'Junkrat',
      'D.Va',
    ]
    await userModel.saveName(names[parseInt(Math.random()*5, 10)]);
    console.log('done');
  }
  
  render() {

    const { userModel } = this.props;
    const { name } = userModel.state;

    return (
      <div>
        <h1>{name}</h1>
        <button onClick={this.handleClick}>Change Name</button>
      </div>
    );
  }
}
