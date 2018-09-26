import React from 'react'
import PropTypes from 'prop-types'
import { Subtitle } from 'bloomer'
import { Link } from 'react-router-dom'

class Dashboard extends React.Component {
  render () {
    const { quizzes, loading, loggedIn } = this.props
    return (
      <div className='Dashboard'>
        <Subtitle>Available quizzes</Subtitle>
        {loading
          ? <div className='loader is-size-1' />
          : quizzes.map(quiz => <div key={quiz.id}><QuizLink loggedIn={loggedIn} quiz={quiz} /></div>)}
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
          &nbsp;
          <span className='QuizLink__question-count'>{quiz.questionCount} questions</span>
          <br />
          {quiz.bestScore
            ? <span>Best score: {percent(quiz.bestScore)}</span>
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
