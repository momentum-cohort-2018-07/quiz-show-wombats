import React from 'react'
import PropTypes from 'prop-types'
import { Field, Label, Control, Input, Subtitle, Button, Notification } from 'bloomer'
import data from '../data'

class Login extends React.Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: '',
      errorMsg: null
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    const { email, password } = this.state
    data.login(email, password)
      .then(user => this.props.setCurrentUser(user))
      .catch(err => {
        console.log(err)
        this.setState({
          errorMsg: err.message
        })
      })
  }

  render () {
    const { errorMsg } = this.state
    return (
      <div className='Login'>
        <Subtitle>Login</Subtitle>
        {errorMsg &&
          <Notification isColor='danger'>
            {errorMsg}
          </Notification>}
        <form onSubmit={this.handleSubmit}>
          <Field>
            <Label htmlFor='email'>Email</Label>
            <Control>
              <Input type='email' required id='email' onChange={e => this.setState({ email: e.target.value })} />
            </Control>
          </Field>
          <Field>
            <Label htmlFor='password'>Password</Label>
            <Control>
              <Input type='password' required id='password' onChange={e => this.setState({ password: e.target.value })} />
            </Control>
          </Field>
          <Field>
            <Control>
              <Button type='submit' isColor='primary'>Login</Button>
            </Control>
          </Field>
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  setCurrentUser: PropTypes.func
}

export default Login
