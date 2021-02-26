import React from 'react'
import UserItem from './UserItem'
import Spinner from '../Spinner'
import PropTypes from 'prop-types'

function Users(props) {
  if(props.loading) {
    return <Spinner/>
  }
  else {
    return(
      <div style={userStyle}>
        {props.users.map((user, index) => {
          return <UserItem 
          key={index}
          user={user}
          />
        })}
      </div>
    )
  }
}


Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
}

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
}

export default Users