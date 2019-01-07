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
    height: '15rem',
    width: '15rem',
    margin: '0 auto'
  }
})(Avatar)

export default class HomeAbout extends React.Component {
  render() {
    const { mainImageUrl } = this.props
    return (
      <div
        className="about"
        onClick={() => {
          location.hash = 'about'
        }}
      >
        <BigAvatar
          src={mainImageUrl}
        />
        <div
          style={styles.about}
        >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
          >
            About
          </Typography>
          <Typography
            variant="h5"
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
