import React, { Component } from 'react'
import {
  Snackbar,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core'
import Navi from './navi'
import Home from './home'
import AboutContainer from './about-container'

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
      view: {
        path: '#home'
      },
      mobile: false,
      status: 'out',
      user: null
    }
    this.handleStatus = this.handleStatus.bind(this)
    this.setUser = this.setUser.bind(this)
    this.renderView = this.renderView.bind(this)
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
  componentDidMount() {
    if (!location.hash) {
      location.hash = 'home'
    }
    window.addEventListener('hashchange', () => {
      this.setState({
        view: {
          path: location.hash
        }
      })
    })
    const mql = window.matchMedia('(max-width: 600px)')
    if (mql.matches) {
      this.setState({
        mobile: true
      })
    }
    mql.addListener((event) => {
      if (event.matches) {
        this.setState({
          mobile: true
        })
      }
      else {
        this.setState({
          mobile: false
        })
      }
    })
    const hashEvent = new Event('hashchange')
    window.dispatchEvent(hashEvent)
  }
  renderView() {
    const { mobile, view } = this.state
    if (view.path === '#home') {
      return (
        <Home
          mobile={mobile}
        />
      )
    }
    else if (view.path === '#about') {
      return (
        <AboutContainer
          mobile={mobile}
        />
      )
    }
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
            open={status === 'fail'}
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
          {
            this.renderView()
          }
        </React.Fragment>
      </MuiThemeProvider>
    )
  }
}
