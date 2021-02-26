import React, { Component } from 'react'
import PropTypes from 'prop-types'


class Search extends Component {
  state = {
    text: ''
  }

  static propTypes = {
    searchUser: PropTypes.func.isRequired
  }

  eventHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.searchUser(this.state.text)
  }

  render() {
    return(
      <div>
        <form action="form" onSubmit={this.onSubmit}>
          <input type="text" name="text" placeholder="Search user..." value={this.state.text} onChange={this.eventHandler}/>
          <input type="submit" value="Find" className="btn btn-primary btn-block"/>
        </form>
      </div>
    )
  }
}

export default Search