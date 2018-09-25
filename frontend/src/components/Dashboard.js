import React from 'react'
import PropTypes from 'prop-types'
import { Subtitle } from 'bloomer'
import { Link } from 'react-router-dom'

class Dashboard extends React.Component {
  render () {
    const { quizzes, loggedIn } = this.props
    return (
      <div className='Dashboard'>
        <Subtitle>Available quizzes</Subtitle>
        <ul>
          {quizzes.map(quiz => <li key={quiz.id}><QuizLink loggedIn={loggedIn} quiz={quiz} /></li>)}
        </ul>
      </div>
    )
  }
}

const QuizLink = ({ loggedIn, quiz }) => {
  if (loggedIn) {
    return (
      <Link to={`/quizzes/${quiz.id}`}>{quiz.title}</Link>
    )
  } else {
    return <React.Fragment>{quiz.title}</React.Fragment>
  }
}

Dashboard.propTypes = {
  loggedIn: PropTypes.bool,
  quizzes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string
    })
  ).isRequired
}

export default Dashboard
