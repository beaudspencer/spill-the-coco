import React from 'react'
import {
  CircularProgress
} from '@material-ui/core'
import BlogPost from './blog-post'

export default class BlogPostContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      post: null
    }
  }
  render() {
    const { loading, post } = this.state
    loading && fetch(`/post?id=${this.props.id}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(post => {
        this.setState({
          loading: false,
          post: post[0]
        })
      })
    return (
      <React.Fragment>
        {
          loading
            ? <CircularProgress/>
            : <BlogPost
              post={post}
            />
        }
      </React.Fragment>
    )
  }
}
