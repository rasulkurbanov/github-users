import React, { useState } from 'react'
import PropTypes from 'prop-types'


const Search = (props) => {
  const [text, setText] = useState('')

  const eventHandler = (e) => {
    setText(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (text === '') {
      props.setAlert('Please enter something!', 'danger')
    }
    else {
      props.searchUser(text)
      setText('')
    }
  }

  return (
    <div>
      <form action="form" onSubmit={onSubmit}>
        <input type="text" name="text" placeholder="Search user..." value={text} onChange={eventHandler} />
        <input type="submit" value="Find" className="btn btn-primary btn-block" />
      </form>
      {props.showBtn ?
        <button className="btn btn-danger btn-block" type="button" onClick={props.clearUser}>Clear</button> : null
      }
    </div>
  )
}


Search.propTypes = {
  searchUser: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
  showBtn: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired
}



export default Search