import React from 'react'
import PropTypes from 'prop-types'
import data from '../data'

class FetchQuiz extends React.Component {
  constructor () {
    super()
    this.state = {
      quiz: {}
    }
  }

  componentDidMount () {
    data.getQuiz(this.props.id).then(quiz => this.setState({ quiz }))
  }

  render () {
    const { quiz } = this.state
    return this.props.render({ quiz })
  }
}

FetchQuiz.propTypes = {
  id: PropTypes.string
}

export default FetchQuiz
