import React from 'react'
import data from '../data'

class FetchQuizzes extends React.Component {
  constructor () {
    super()
    this.state = {
      quizzes: []
    }
  }

  componentDidMount () {
    data.getQuizzes().then(quizzes => this.setState({ quizzes }))
  }

  render () {
    const { quizzes } = this.state
    return this.props.render({ quizzes })
  }
}

export default FetchQuizzes
