import React from 'react'
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  withStyles
} from '@material-ui/core'

const PostPreviewD = withStyles({
  root: {
    display: 'flex',
    width: '100%',
    backgroundColor: '#f2f7f2'
  }
})(Card)

const PostPreviewM = withStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#f2f7f2'
  }
})(Card)

const PreviewContent = withStyles({
  root: {
    margin: 'auto',
    flex: 1
  }
})(CardContent)

export default class BlogPreview extends React.Component {
  constructor(props) {
    super(props)
    this.renderContent = this.renderContent.bind(this)
  }
  renderContent() {
    const { post, mobile } = this.props
    return (
      <React.Fragment>
        <CardActionArea
          style={{
            width: mobile ? '100%' : 240,
            height: mobile ? 168 : 200
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: `url("${post.thumb}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        </CardActionArea>
        <CardActionArea>
          <PreviewContent>
            <Typography
              align="center"
              variant="h5"
              component="h5"
              gutterBottom
            >
              {
                post.header
              }
            </Typography>
            <Typography
              align="center"
              variant="subtitle1"
              color="inherit"
            >
              {
                post.description
              }
            </Typography>
          </PreviewContent>
        </CardActionArea>
      </React.Fragment>
    )
  }
  render() {
    const { mobile } = this.props
    return (
      <React.Fragment>
        {
          mobile
            ? <PostPreviewM>
              {
                this.renderContent()
              }
            </PostPreviewM>
            : <PostPreviewD>
              {
                this.renderContent()
              }
            </PostPreviewD>
        }
      </React.Fragment>
    )
  }
}
