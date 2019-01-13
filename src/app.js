import React, { Component } from 'react'
import {
  Snackbar,
  Typography,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core'
import Navi from './navi'
import Home from './home'
import AboutContainer from './about-container'
import CategoryPostsContainer from './category-posts-container'
import PostCreator from './post-creator'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fffd7e'
    },
    secondary: {
      main: '#e6e5a0'
    }
  },
  typography: {
    fontFamily: 'Thasadith, serif',
    fontWeightMedium: 'bolder',
    fontWeightRegular: 'bolder',
    useNextVariants: true
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
      user: null,
      snackbar: false
    }
    this.handleStatus = this.handleStatus.bind(this)
    this.setUser = this.setUser.bind(this)
    this.renderView = this.renderView.bind(this)
    this.close = this.close.bind(this)
  }
  handleStatus(status, profile) {
    profile
      ? this.setUser(profile)
      : this.setState({
        status: status,
        user: null
      })
    this.setState({
      status: status,
      snackbar: true
    })
  }
  setUser(googleUser) {
    this.setState({
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
    const mql = window.matchMedia('(max-width: 800px)')
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
  close() {
    this.setState({
      snackbar: false
    })
  }
  renderView() {
    const { mobile, view, user } = this.state
    if (view.path === '#home') {
      return (
        <Home
          user={user}
          mobile={mobile}
        />
      )
    }
    else if (view.path === '#about') {
      return (
        <AboutContainer
          user={user}
        />
      )
    }
    else if (view.path === '#food' ||
      view.path === '#life' ||
      view.path === '#travel') {
      return (
        <CategoryPostsContainer
          user={user}
          mobile={mobile}
          cat={view.path.slice(1)}
        />
      )
    }
    else if (view.path === '#new') {
      return (
        <PostCreator
          user={user}
        />
      )
    }
  }
  render() {
    const { status, snackbar, user } = this.state
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
            open={snackbar}
            autoHideDuration={4000}
            onClose={this.close}
            ContentProps={{
              'aria-describedby': 'message-id'
            }}
            message={<Typography
              id="message-id"
              align="center"
              color="inherit"
              variant="h6"
            >
              {
                status !== 'fail'
                  ? `logged ${status}`
                  : 'Failed login'
              }
            </Typography>
            }
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
