import React from 'react';

const User = (props) => {
  const { id, name, bio } = props;
  return (
    <div key={id}>
      <span>{name}</span><span onClick={() => props.handleDelete(id)}>&times;</span>
      <div>{bio}</div>
    </div>
  );
}
 
export default User;
