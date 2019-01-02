import React, { Component } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  withStyles
} from '@material-ui/core'
import { generateKeyPair } from 'crypto';

const styles = {
  signin: {
    position: 'absolute',
    right: '1rem'
  }
}

const Navi = withStyles({
  positionSticky: true
})(AppBar)

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.handleSuccess = this.handleSuccess.bind(this)
    this.handleFailure = this.handleFailure.bind(this)
  }
  handleSuccess(googleUser) {
  const profile = googleUser.getBasicProfile()
  console.log('ID: ' + profile.getId())
  console.log('Name: ' + profile.getName())
  console.log('Image URL: ' + profile.getImageUrl())
  console.log('Email: ' + profile.getEmail())
  }
  handleFailure() {
    console.log('Fail')
  }
  componentDidMount() {
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
            <div id="g-signin2" data-onsuccess={this.onSignIn} />
          </div>
        </Toolbar>
      </Navi>
    )
  }
}