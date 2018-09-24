import React from 'react'
import PropTypes from 'prop-types'
import { Subtitle } from 'bloomer'

class Dashboard extends React.Component {
  render () {
    const { quizzes } = this.props
    return (
      <div className='Dashboard'>
        <Subtitle>Available quizzes</Subtitle>
        <ul>
          {quizzes.map(quiz => <li key={quiz.id}>{quiz.title}</li>)}
        </ul>
      </div>
    )
  }
}

Dashboard.propTypes = {
  quizzes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string
    })
  ).isRequired
}

export default Dashboard
