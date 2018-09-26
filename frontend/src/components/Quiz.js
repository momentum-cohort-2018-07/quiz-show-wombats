import React from 'react'
import PropTypes from 'prop-types'
import { Title, Subtitle, Field, Control, Radio, Columns, Column, Button, Notification } from 'bloomer'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'

import data from '../data'

class Quiz extends React.Component {
  constructor () {
    super()
    this.state = {
      answers: {},
      errorMsg: null,
      score: null
    }
  }

  handleAnswer (event) {
    const target = event.target
    const questionId = target.dataset.questionId
    const answerId = target.value
    if (target.checked) {
      this.setState(state => ({
        answers: Object.assign({}, state.answers, { [questionId]: answerId })
      }))
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    data.scoreQuiz(this.props.quiz.id, this.state.answers)
      .then(data => {
        const score = `${data.correct}/${data.total}`
        this.setState({ errorMsg: null, score: score })
      })
      .catch(err => {
        this.setState({
          errorMsg: err.message
        })
      })
  }

  render () {
    const { quiz, loading } = this.props
    const { errorMsg, score } = this.state

    if (score) {
      return (
        <div className='Quiz--score'>
          <Title isSize={4}>{quiz.title}</Title>
          <Subtitle>Your score was {score}.</Subtitle>
          <p><Link to='/'>Take another quiz.</Link></p>
        </div>
      )
    }

    if (loading) {
      return <div className='loader is-size-1' />
    }

    return (
      <div className='Quiz'>
        <Title isSize={4}>{quiz.title}</Title>
        {errorMsg &&
          <Notification isColor='danger'>
            {errorMsg}
          </Notification>}
        {quiz.questions && quiz.questions.map(question =>
          <Question key={question.id} question={question} onAnswer={e => this.handleAnswer(e)} />)}
        <Control>
          <Button isColor='primary' onClick={e => this.handleSubmit(e)}>Submit Quiz</Button>
        </Control>
      </div>
    )
  }
}

Quiz.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    questions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
      answers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string
      }))
    }))
  }).isRequired
}

const Question = ({ question, onAnswer }) => {
  return (
    <div className='Question'>
      <Subtitle><ReactMarkdown source={question.text} /></Subtitle>
      <div className='Answers'>
        <Columns isMultiline>
          {question.answers.map(answer => (
            <Column key={answer.id} isSize={{ mobile: 12, default: 6 }}>
              <Field>
                <Control>
                  <Radio
                    data-question-id={question.id}
                    name={`q-${question.id}`}
                    value={answer.id}
                    onClick={onAnswer}>
                    <ReactMarkdown
                      className='markdown'
                      source={answer.text}
                      allowedTypes={['emphasis', 'strong', 'inlineCode']}
                      unwrapDisallowed />
                  </Radio>
                </Control>
              </Field>
            </Column>
          ))}
        </Columns>
      </div>
    </div>
  )
}

export default Quiz
