import { Container, Section } from 'bloomer'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import data from '../data'
import Dashboard from './Dashboard'
import FetchQuiz from './FetchQuiz'
import FetchQuizzes from './FetchQuizzes'
import Guard from './Guard'
import Login from './Login'
import Navigation from './Navigation'
import Quiz from './Quiz'
import Register from './Register'
import localforage from 'localforage'

class QuizShowApp extends Component {
  constructor () {
    super()
    this.state = {
      currentUser: null,
      userLoaded: false
    }

    this.setCurrentUser = this.setCurrentUser.bind(this)
  }

  componentDidMount () {
    localforage.getItem('user')
      .then(user => {
        if (user && user.token) {
          data.setUserToken(user.token)
          this.setState({
            userLoaded: true,
            currentUser: user
          })
        } else {
          this.setState({
            userLoaded: true,
            currentUser: null
          })
        }
      })
  }

  setCurrentUser (user) {
    localforage.setItem('user', user)
      .then(() => localforage.getItem('user'))
      .then(user => this.setState({ currentUser: user }))
  }

  logout () {
    window.localStorage.removeItem('email')
    window.localStorage.removeItem('token')
    this.setState({ currentUser: null })
  }

  render () {
    const { currentUser, userLoaded } = this.state
    return (
      <Router>
        <div className='QuizShowApp'>
          <Navigation currentUser={currentUser} onLogout={e => this.logout()} />
          <Section>
            <Container>
              <Route exact path='/' render={() =>
                <FetchQuizzes render={({ quizzes, loading }) =>
                  <Dashboard loggedIn={!!currentUser} loading={loading} quizzes={quizzes} />} />} />
              <Route path='/quizzes/:id' render={({ match }) =>
                <Guard condition={!userLoaded || currentUser} redirectTo='/login'>
                  <FetchQuiz
                    id={match.params.id}
                    render={({ quiz, loading }) => <Quiz loading={loading} quiz={quiz} />} />
                </Guard>} />
              <Route path='/login' render={() =>
                <Guard condition={!userLoaded || !currentUser} redirectTo='/'>
                  <Login setCurrentUser={this.setCurrentUser} />
                </Guard>
              } />
              <Route path='/register' render={() =>
                <Guard condition={!userLoaded || !currentUser} redirectTo='/'>
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
