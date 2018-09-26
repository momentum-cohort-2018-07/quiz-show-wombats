import React from 'react'
import {
  Navbar, NavbarBrand, NavbarItem, NavbarMenu, NavbarEnd, NavbarBurger,
  Container,
  Title
} from 'bloomer'
import { Link, NavLink } from 'react-router-dom'

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
    const { userLoaded, currentUser, onLogout } = this.props
    return (
      <Navbar>
        <Container>
          <NavbarBrand>
            <NavbarItem>
              <Title isSize='3'>
                <Link to='/'>QuizShow</Link>
              </Title>
            </NavbarItem>
            <NavbarBurger isActive={this.state.isActive} onClick={this.onClickNav} />
          </NavbarBrand>
          {userLoaded &&
          <NavbarMenu isActive={this.state.isActive} onClick={this.onClickNav}>
            <NavbarEnd>
              {currentUser
                ? <LoggedInMenu currentUser={currentUser} onLogout={onLogout} />
                : <LoggedOutMenu />}
            </NavbarEnd>
          </NavbarMenu>
          }
        </Container>
      </Navbar>
    )
  }
}

Navigation.propTypes = {
  currentUser: UserPropType
}

const LoggedInMenu = ({ currentUser, onLogout }) => (
  <React.Fragment>
    <NavbarItem>Logged in as {currentUser.email}</NavbarItem>
    <NavbarItem><a onClick={onLogout}>Log out</a></NavbarItem>
  </React.Fragment>
)

const LoggedOutMenu = () => (
  <React.Fragment>
    <NavbarItem><NavLink to='/login'>Log in</NavLink></NavbarItem>
    <NavbarItem><NavLink to='/register'>Register</NavLink></NavbarItem>
  </React.Fragment>
)

export default Navigation
