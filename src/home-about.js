import React from 'react'
import {
  Avatar,
  withStyles,
  Typography
} from '@material-ui/core'

const styles = {
  about: {
    marginTop: '3rem'
  }
}

const BigAvatar = withStyles({
  root: {
    height: '20rem',
    width: '20rem',
    margin: '0 auto'
  }
})(Avatar)

export default class HomeAbout extends React.Component {
  render() {
    const { mainImageUrl } = this.props
    return (
      <div>
        <BigAvatar
          src={mainImageUrl}
        />
        <div
          style={styles.about}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
          >
            About
          </Typography>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
          >
            Coco
          </Typography>
        </div>
      </div>
    )
  }
}
