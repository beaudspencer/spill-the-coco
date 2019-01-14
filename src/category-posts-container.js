import React from 'react'
import {
  CircularProgress
} from '@material-ui/core'
import CategoryDescription from './category-description'
import PostList from './post-list'

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
      loading: true,
      about: null,
      posts: null
    }
    this.reloadPage = this.reloadPage.bind(this)
  }
  reloadPage() {
    this.setState({
      loading: true
    })
  }
  render() {
    const { user, cat, mobile } = this.props
    const { about, loading, posts } = this.state
    loading && fetch(`/category?cat=${cat}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(about => {
        this.setState({
          about
        })
      })
      .then(fetch(`/posts?cat=${cat}`, {
        method: 'GET'
      })
        .then(res => res.json())
        .then(posts => {
          this.setState({
            posts,
            loading: false
          })
        }))
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
              <React.Fragment>
                <CategoryDescription
                  reload={this.reloadPage}
                  user={user}
                  post={about}
                />
                <PostList
                  mobile={mobile}
                  posts={posts}
                />
              </React.Fragment>
            )
        }
      </React.Fragment>
    )
  }
}
