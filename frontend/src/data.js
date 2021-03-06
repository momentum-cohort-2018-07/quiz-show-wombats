import request from 'superagent'

const apiHost = process.env.REACT_APP_API_HOST
const api = (path) => `${apiHost}/${path}`

let userToken

function sendAuth (req) {
  if (userToken) {
    return req.set('Authorization', `Bearer ${userToken}`)
  } else {
    return req
  }
}

const data = {
  setUserToken: (token) => {
    userToken = token
  },
  getUserToken: () => {
    return userToken
  },
  login: (email, password) => {
    return request.post(api('login'))
      .send({ email, password })
      .then(res => res.body.data)
      .then(data => ({ email: data.email, isAdmin: data.is_admin, token: data.auth_token }))
      .then(user => {
        data.setUserToken(user.token)
        return user
      })
      .catch(err => {
        if (err.response.statusCode === 422) {
          const errors = err.response.body.errors
          throw new Error(errors[0])
        } else {
          throw new Error('There was a problem communicating with the server.')
        }
      })
  },
  register: (email, password) => {
    return request.post(api('register'))
      .send({ email, password })
      .then(res => res.body.data)
      .then(data => ({ email: data.email, isAdmin: data.is_admin, token: data.auth_token }))
      .then(user => {
        data.setUserToken(user.token)
        return user
      })
      .catch(err => {
        if (err.response.statusCode === 422) {
          const errors = err.response.body.errors
          throw new Error(errors[0])
        } else {
          throw new Error('There was a problem communicating with the server.')
        }
      })
  },
  getQuizzes: () => {
    return sendAuth(request.get(api('quizzes')))
      .then(res => res.body.data.items)
  },
  getQuiz: (id) => {
    return sendAuth(request.get(api(`quizzes/${id}`)))
      .then(res => res.body.data)
  },
  scoreQuiz: (quizId, answers) => {
    return sendAuth(request.post(api(`quizzes/${quizId}/score`)))
      .send({ answers })
      .then(res => res.body.data)
      .catch(err => {
        if (err.response.statusCode === 422) {
          const errors = err.response.body.errors
          throw new Error(errors[0])
        } else {
          throw new Error('There was a problem communicating with the server.')
        }
      })
  }
}

export default data
