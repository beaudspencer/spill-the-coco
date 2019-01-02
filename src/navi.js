import React, { Component } from 'react'
import {
  AppBar,
  Toolbar,
  Avatar,
  IconButton,
  Typography,
  withStyles,
  Button
} from '@material-ui/core'
import { generateKeyPair } from 'crypto';

const styles = {
  signin: {
    position: 'absolute',
    right: '1rem',
    display: 'inherit'
  }
}

const LogOut = withStyles({
  root : {
    color: '#fff'
  }
})(Typography)

const Navi = withStyles({
  root: {
    positionSticky: true
  }
})(AppBar)

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'out'
    }
    this.stateOut = this.stateOut.bind(this)
    this.renderSignButton = this.renderSignButton.bind(this)
    this.logOut = this.logOut.bind(this)
    this.renderLogin = this.renderLogin.bind(this)
    this.handleSuccess = this.handleSuccess.bind(this)
    this.handleFailure = this.handleFailure.bind(this)
  }
  handleSuccess(googleUser) {
    const profile = googleUser.getBasicProfile()
    this.setState({
      status: 'in',
      image: profile.getImageUrl()
    })
  }
  handleFailure() {
    this.setState({
      status: 'fail'
    })
  }
  stateOut() {
    this.setState({
      status: 'out'
    })
  }
  logOut() {
    const stateOut = this.stateOut
    const auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut().then(function () {
      console.log('User signed out.')
      stateOut()
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
    this.state.status === 'out' &&
      this.renderSignButton()
  }
  renderLogin() {
    const { status, image } = this.state
    if(status === 'out') {
      return (
        <div id="g-signin2" data-onsuccess={this.onSignIn} />
      )
    }
    else if(status === 'in') {
      return (
        <React.Fragment>
          <Button
            color="primary"
            onClick={this.logOut}
          >
            <LogOut>
              Log Out
            </LogOut>
          </Button>
          <Avatar src={image}/>
        </React.Fragment>
      )
    }
  }
  render() {
    return (
      <Navi
        color="primary"
      >
        <Toolbar>
          <Typography
            variant="h4"
            color="inherit"
          >
            Spill The Coco
          </Typography>
          <div
            style={styles.signin}
          >
          {this.renderLogin()}
          </div>
        </Toolbar>
      </Navi>
    )
  }
}