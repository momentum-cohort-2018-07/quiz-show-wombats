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
        {quizzes.map(quiz => <div key={quiz.id}><QuizLink loggedIn={loggedIn} quiz={quiz} /></div>)}
      </div>
    )
  }
}

const QuizLink = ({ loggedIn, quiz }) => {
  return (
    <div className='QuizLink'>
      {loggedIn
        ? <React.Fragment>
          <Link to={`/quizzes/${quiz.id}`}>
            <span className='is-size-5'>{quiz.title}</span>
          </Link>
          <br />
          {quiz.prevScore
            ? <span>Previous score: {percent(quiz.prevScore)}</span>
            : <span>Not previously taken</span>}
        </React.Fragment>
        : <span className='is-size-5'>{quiz.title}</span>}
    </div>
  )
}

const percent = (n) => {
  return `${Math.round(n * 10 ** 4) / 10 ** 2}%`
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
