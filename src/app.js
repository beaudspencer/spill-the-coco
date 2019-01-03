import React, { Component } from 'react'
import {
  Snackbar
} from '@material-ui/core'
import Navi from './navi'

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
      <React.Fragment>
        <div>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={status === 'fail'
              ? true
              : false
            }
            autoHideDuration={6000}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Failed Login</span>}
          />
        </div>
        <Navi
          user={user}
          status={status}
          setUser={this.setUser}
          handleStatus={this.handleStatus}
        />
      </React.Fragment>
    )
  }
}