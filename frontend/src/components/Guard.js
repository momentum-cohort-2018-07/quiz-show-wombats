import React from 'react'
import { Redirect } from 'react-router-dom'

const Guard = ({ redirectTo, condition, children }) => {
  if (condition) {
    return children
  } else {
    return <Redirect to={redirectTo} />
  }
}

export default Guard
