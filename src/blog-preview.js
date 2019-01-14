import React from 'react'
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  withStyles
} from '@material-ui/core'
import hash from './hash'

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
    this.setPage = this.setPage.bind(this)
  }
  setPage() {
    const { _id } = this.props.post
    location.hash = hash.stringify({
      path: 'post',
      params: {
        id: _id
      }
    })
  }
  renderContent() {
    const { post, mobile } = this.props
    return (
      <React.Fragment>
        <CardActionArea
          onClick={this.setPage}
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
        <CardActionArea
          onClick={this.setPage}
        >
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
