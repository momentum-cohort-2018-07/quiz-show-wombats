import React from 'react'
import PropTypes from 'prop-types'
import { Field, Label, Control, Input, Subtitle, Button, Notification } from 'bloomer'
import data from '../data'

class Register extends React.Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      errorMsg: null
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    const { email, password, passwordConfirmation } = this.state
    if (passwordConfirmation === password) {
      data.register(email, password)
        .then(user => this.props.setCurrentUser(user))
        .catch(err => {
          this.setState({
            errorMsg: err.message
          })
        })
    } else {
      this.setState({ errorMsg: 'Your password and confirmation must match.' })
    }
  }

  render () {
    const { errorMsg } = this.state
    return (
      <div className='Register'>
        <Subtitle>Register</Subtitle>
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
            <Label htmlFor='password_confirm'>Password Confirmation</Label>
            <Control>
              <Input type='password' required id='password_confirm' onChange={e => this.setState({ passwordConfirmation: e.target.value })} />
            </Control>
          </Field>
          <Field>
            <Control>
              <Button type='submit' isColor='primary'>Register</Button>
            </Control>
          </Field>
        </form>
      </div>
    )
  }
}

Register.propTypes = {
  setCurrentUser: PropTypes.func
}

export default Register
