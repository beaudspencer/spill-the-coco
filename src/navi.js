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
    this.props.handleStatus('in', profile)
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
      'width': 92,
      'height': 37,
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
            <Typography
              variant="button"
            >
              Log Out
            </Typography>
          </Button>
          <Avatar src={user.getImageUrl()}/>
        </React.Fragment>
      )
    }
  }
  render() {
    return (
      <NavBar
        height="6rem"
        color="primary"
      >
        <Toolbar>
          <FreeBreakfast
            fontSize="large"
            className="hover"
            onClick={() => {
              location.hash = 'home'
            }}
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
