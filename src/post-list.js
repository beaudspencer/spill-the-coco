import React from 'react'
import {
  List,
  ListItem
} from '@material-ui/core'
import BlogPreview from './blog-preview'

const styles = {
  container: {
    margin: '3rem auto',
    width: '80%',
    maxWidth: '40rem'
  }
}

export default class PostList extends React.Component {
  render() {
    const { posts, mobile } = this.props
    return (
      <div
        style={styles.container}
      >
        <List>
          {
            posts.map(post => {
              return (
                <ListItem
                  key={post.header}
                >
                  <BlogPreview
                    mobile={mobile}
                    post={post}
                  />
                </ListItem>
              )
            })
          }
        </List>
      </div>
    )
  }
}
