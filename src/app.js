import React, { Component } from 'react'
import {
  Snackbar,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core'
import Navi from './navi'
import Home from './home'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#11de3a'
    },
    secondary: {
      main: '#34c22c'
    }
  }
})

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'out',
      user: null
    }
    this.handleStatus = this.handleStatus.bind(this)
    this.setUser = this.setUser.bind(this)
  }
  handleStatus(status) {
    this.setState({
      status: status
    })
  }
  setUser(googleUser) {
    this.setState({
      status: 'in',
      user: googleUser
    })
  }
  render() {
    const { status, user } = this.state
    return (
      <MuiThemeProvider
        theme={theme}
      >
        <React.Fragment>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            open={status === 'fail'
            }
            autoHideDuration={6000}
            ContentProps={{
              'aria-describedby': 'message-id'
            }}
            message={<span id="message-id">Failed Login</span>}
          />
          <Navi
            user={user}
            status={status}
            setUser={this.setUser}
            handleStatus={this.handleStatus}
          />
          <Home />
        </React.Fragment>
      </MuiThemeProvider>
    )
  }
}
