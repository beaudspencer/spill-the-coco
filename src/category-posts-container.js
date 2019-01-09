import React from 'react'
import {
  CircularProgress
} from '@material-ui/core'
import CategoryDescription from './category-description'

const styles = {
  loadingContainer: {
    width: 'fit-content',
    margin: '3rem auto'
  }
}

export default class CategoryPostsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
    this.reloadPage = this.reloadPage.bind(this)
  }
  reloadPage() {
    this.setState({
      loading: true
    })
  }
  render() {
    const { admin, user, cat } = this.props
    const { post, loading } = this.state
    loading && fetch(`/category?cat=${cat}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(post => {
        this.setState({
          post: post,
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
              <CategoryDescription
                reload={this.reloadPage}
                admin={admin}
                user={user}
                post={post}
              />
            )
        }
      </React.Fragment>
    )
  }
}
