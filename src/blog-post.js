import React from 'react'
import {
  Typography,
  withStyles
} from '@material-ui/core'

const styles = {
  container: {
    width: '80%',
    maxWidth: '40rem',
    margin: '3rem auto'
  }
}

const Header = withStyles({
  root: {
    fontFamily: 'Calligraffitti, cursive'
  }
})(Typography)

export default class BlogPost extends React.Component {
  constructor(props) {
    super(props)
    this.renderContent = this.renderContent.bind(this)
  }
  renderContent(element) {
    if (element.type === 'header') {
      return (
        <Typography
          key={element.id}
          align="left"
          variant="h4"
          gutterBottom
        >
          {
            element.content
          }
        </Typography>
      )
    }
    else if (element.type === 'text') {
      return (
        <div
          key={element.id}
        >
          {
            element.content.split('\n').map((text, index) => {
              return (
                <Typography
                  key={element.id + index.toString()}
                  align="left"
                  variant="h6"
                  gutterBottom
                >
                  {
                    text
                  }
                </Typography>
              )
            })
          }
        </div>
      )
    }
    else {
      const imageStyles = {
        borderRadius: '4px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        maxWidth: '40rem',
        height: '40vh',
        margin: '3rem 0',
        backgroundImage: `url("${element.content}")`
      }
      return (
        <div
          key={element.id}
          style={
            imageStyles
          }
        >
        </div>
      )
    }
  }
  render() {
    const { post } = this.props
    return (
      <div
        style={styles.container}
      >
        <Header
          variant="h3"
          align="center"
          gutterBottom
        >
          {
            post.header
          }
        </Header>
        {
          post.content.map(element => {
            return this.renderContent(element)
          })
        }
      </div>
    )
  }
}
