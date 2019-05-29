import React, { Component } from 'react';
import axios from 'axios';
import User from './User';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4444/api/users')
      .then(({ data: users }) => {
        this.setState({
          ...this.state,
          users,
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDelete = id => {
    axios.delete(`http://localhost:4444/api/users/${id}`)
      .then(() => {
        this.setState({
          ...this.state,
          users: this.state.users.filter(user => user.id !== id),
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() { 
    return (
      <div className="Users">
        {
          this.state.users.map(user => (
            <User
              key={user.id}
              {...user}
              handleDelete={this.handleDelete}
            />
          ) )
        }
      </div>
    );
  }
}
 
export default Users;
