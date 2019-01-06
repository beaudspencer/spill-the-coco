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
          about: post.text,
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
                admin={admin}
                user={user}
                text={about}
              />
            )
        }
      </React.Fragment>
    )
  }
}