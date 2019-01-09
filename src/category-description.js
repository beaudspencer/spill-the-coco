import React from 'react'
import {
  withStyles,
  Typography
} from '@material-ui/core'

const styles = {
  container: {
    margin: '3rem auto',
    width: '80%'
  }
}

const Header = withStyles({
  root: {
    fontFamily: 'Calligraffitti, cursive'
  }
})(Typography)

export default class CategoryDescription extends React.Component {
  render() {
    const { post } = this.props
    return (
      <div
        style={styles.container}
      >
        <Header
          gutterBottom
          variant="h3"
          align="center"
        >
          {
            post.post
          }
        </Header>
        <Typography
          align="center"
          variant="h6"
        >
          {
            post.text
          }
        </Typography>
      </div>
    )
  }
}
