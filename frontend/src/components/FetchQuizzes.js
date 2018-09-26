import React from 'react'
import data from '../data'

class FetchQuizzes extends React.Component {
  constructor () {
    super()
    this.state = {
      quizzes: [],
      loading: true
    }
  }

  componentDidMount () {
    data.getQuizzes().then(quizzes => this.setState({ quizzes, loading: false }))
  }

  render () {
    return this.props.render(this.state)
  }
}

export default FetchQuizzes
