/* global gapi */
import React, { Component } from 'react'
import {
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  withStyles,
  Button
} from '@material-ui/core'
import FreeBreakfast from '@material-ui/icons/FreeBreakfastTwoTone'

const styles = {
  signin: {
    position: 'absolute',
    right: '1rem',
    display: 'inherit'
  },
  white: {
    color: '#e0ffff'
  }
}

const LogOut = withStyles({
  root: {
    color: '#e0ffff'
  }
})(Typography)

const NavBar = withStyles({
  root: {
    position: 'sticky'
  }
})(AppBar)

export default class Navi extends Component {
  constructor(props) {
    super(props)
    this.logOut = this.logOut.bind(this)
    this.renderLogin = this.renderLogin.bind(this)
    this.handleSuccess = this.handleSuccess.bind(this)
    this.handleFailure = this.handleFailure.bind(this)
  }
  handleSuccess(googleUser) {
    const profile = googleUser.getBasicProfile()
    this.props.setUser(profile)
  }
  handleFailure() {
    this.props.handleStatus('fail')
  }
  logOut() {
    const { handleStatus } = this.props
    const auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut().then(function () {
      handleStatus('out')
    })
  }
  renderSignButton() {
    gapi.signin2.render('g-signin2', {
      'scope': 'profile email',
      'width': 120,
      'height': 40,
      'longtitle': false,
      'theme': 'light',
      'onsuccess': this.handleSuccess,
      'onfailure': this.handleFailure
    })
  }
  componentDidMount() {
    this.renderSignButton()
  }
  componentDidUpdate() {
    const { status } = this.props
    if (status === 'out' || status === 'fail') {
      this.renderSignButton()
    }
  }
  renderLogin() {
    const { status, user } = this.props
    if (status === 'out' || status === 'fail') {
      return (
        <div
          id="g-signin2"
          data-onsuccess={this.onSignIn}
        />
      )
    }
    else if (status === 'in') {
      return (
        <React.Fragment>
          <Button
            color="primary"
            onClick={this.logOut}
          >
            <LogOut
              variant="button"
            >
              Log Out
            </LogOut>
          </Button>
          <Avatar src={user.getImageUrl()}/>
        </React.Fragment>
      )
    }
  }
  render() {
    return (
      <NavBar
        color="primary"
      >
        <Toolbar>
          <FreeBreakfast
            className="hover"
            onClick={() => {
              location.hash = 'home'
            }}
            style={styles.white}
          />
          <div
            style={styles.signin}
          >
            {this.renderLogin()}
          </div>
        </Toolbar>
      </NavBar>
    )
  }
}
