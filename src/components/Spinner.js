import React, { Fragment } from 'react'
import SpinnerGif from './spinner.gif'

function Spinner() {
  return(
    <Fragment>
      <img src={SpinnerGif} alt="Spinner"/>
    </Fragment>
  )
}

export default Spinner