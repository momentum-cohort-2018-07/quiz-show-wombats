import { Container, Section } from 'bloomer'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import data from '../data'
import Dashboard from './Dashboard'
import FetchQuizzes from './FetchQuizzes'
import Guard from './Guard'
import Login from './Login'
import Navigation from './Navigation'
import Register from './Register'
import Quiz from './Quiz'
import FetchQuiz from './FetchQuiz'

class QuizShowApp extends Component {
  constructor () {
    super()
    this.state = {
      currentUser: null
    }

    const email = window.localStorage.getItem('email')
    const token = window.localStorage.getItem('token')
    if (email && token) {
      this.state.currentUser = { email, token }
      data.setUserToken(token)
    }

    this.setCurrentUser = this.setCurrentUser.bind(this)
  }

  setCurrentUser (user) {
    window.localStorage.setItem('email', user.email)
    window.localStorage.setItem('token', user.token)
    this.setState({
      currentUser: user
    })
  }

  render () {
    const { currentUser } = this.state
    return (
      <Router>
        <div className='QuizShowApp'>
          <Navigation currentUser={currentUser} />
          <Section>
            <Container>
              <Route exact path='/' render={() =>
                <FetchQuizzes render={({ quizzes }) =>
                  <Dashboard loggedIn={!!currentUser} quizzes={quizzes} />} />} />
              <Route path='/quizzes/:id' render={({ match }) =>
                <Guard condition={currentUser} redirectTo='/login'>
                  <FetchQuiz
                    id={match.params.id}
                    render={({ quiz }) => <Quiz quiz={quiz} />} />
                </Guard>} />
              <Route path='/login' render={() =>
                <Guard condition={!currentUser} redirectTo='/'>
                  <Login setCurrentUser={this.setCurrentUser} />
                </Guard>
              } />
              <Route path='/register' render={() =>
                <Guard condition={!currentUser} redirectTo='/'>
                  <Register setCurrentUser={this.setCurrentUser} />
                </Guard>
              } />
            </Container>
          </Section>
        </div>
      </Router>
    )
  }
}

export default QuizShowApp
