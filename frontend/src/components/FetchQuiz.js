import React from 'react'
import PropTypes from 'prop-types'
import data from '../data'

class FetchQuiz extends React.Component {
  constructor () {
    super()
    this.state = {
      quiz: {},
      loading: true
    }
  }

  componentDidMount () {
    data.getQuiz(this.props.id).then(quiz => this.setState({ quiz, loading: false }))
  }

  render () {
    return this.props.render(this.state)
  }
}

FetchQuiz.propTypes = {
  id: PropTypes.string
}

export default FetchQuiz
