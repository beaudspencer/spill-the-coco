import React from 'react'
import {
  CircularProgress
} from '@material-ui/core'
import About from './about'

const styles = {
  loadingContainer: {
    width: 'fit-content',
    margin: '3rem auto'
  }
}

export default class AboutContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      about: null
    }
    this.reloadPage = this.reloadPage.bind(this)
  }
  reloadPage() {
    this.setState({
      loading: true
    })
  }
  render() {
    const { admin, user } = this.props
    const { about, loading } = this.state
    loading && fetch('/about', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(post => {
        this.setState({
          about: post,
          loading: false
        })
      })
    return (
      <React.Fragment>
        {
          loading
            ? (
              <div
                style={styles.loadingContainer}
              >
                <CircularProgress
                  color="secondary"
                />
              </div>
            )
            : (
              <About
                reload={this.reloadPage}
                admin={admin}
                user={user}
                about={about}
              />
            )
        }
      </React.Fragment>
    )
  }
}
