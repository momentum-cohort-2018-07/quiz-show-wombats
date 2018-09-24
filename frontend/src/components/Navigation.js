import React from 'react'
import {
  Navbar, NavbarBrand, NavbarItem, NavbarMenu, NavbarEnd, NavbarBurger,
  Container,
  Title
} from 'bloomer'
import { NavLink } from 'react-router-dom'

import { UserPropType } from '../commonPropTypes'

class Navigation extends React.Component {
  constructor () {
    super()
    this.state = {
      isActive: false
    }

    this.onClickNav = this.onClickNav.bind(this)
  }

  onClickNav () {
    this.setState(state => ({ isActive: !state.isActive }))
  }

  render () {
    const { currentUser } = this.props
    return (
      <Navbar>
        <Container>
          <NavbarBrand>
            <NavbarItem>
              <Title isSize='3'>QuizShow</Title>
            </NavbarItem>
            <NavbarBurger isActive={this.state.isActive} onClick={this.onClickNav} />
          </NavbarBrand>
          <NavbarMenu isActive={this.state.isActive} onClick={this.onClickNav}>
            <NavbarEnd>
              {currentUser
                ? <NavbarItem>Logged in as {currentUser.email}</NavbarItem>
                : <React.Fragment>
                  <NavbarItem><NavLink to='/login'>Log in</NavLink></NavbarItem>
                  <NavbarItem><NavLink to='/register'>Register</NavLink></NavbarItem>
                </React.Fragment>}
            </NavbarEnd>
          </NavbarMenu>
        </Container>
      </Navbar>
    )
  }
}

Navigation.propTypes = {
  currentUser: UserPropType
}

export default Navigation
