import React from 'react'
import PropTypes from 'prop-types'
import { Title, Subtitle, Field, Control, Radio, Columns, Column } from 'bloomer'
import ReactMarkdown from 'react-markdown'

class Quiz extends React.Component {
  render () {
    const { quiz } = this.props
    return (
      <div className='Quiz'>
        <Title isSize={4}>{quiz.title}</Title>
        {quiz.questions && quiz.questions.map(question =>
          <Question key={question.id} question={question} />)}
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

const Question = ({ question }) => {
  return (
    <div className='Question'>
      <Subtitle><ReactMarkdown source={question.text} /></Subtitle>
      <div className='Answers'>
        <Columns isMultiline>
          {question.answers.map(answer => (
            <Column key={answer.id} isSize={{ mobile: 12, default: 6 }}>
              <Field>
                <Control>
                  <Radio name={`q-${question.id}`}>
                    <ReactMarkdown
                      className='markdown'
                      source={answer.text}
                      allowedTypes={['text', 'emphasis', 'strong', 'inlineCode']}
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
