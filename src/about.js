import React from 'react'
import {
  Typography,
  Button
} from '@material-ui/core'

const styles = {
  container: {
    marginTop: '3rem',
    textAlign: 'center'
  },
  image: {
    margin: '3rem auto',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '80%',
    height: '20rem',
    backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThQdEoLRyJtupcwF2-wC0_29EvlhQNJ9hYJd-SCoFrfP_ZBYeD")'
  }
}

export default class About extends React.Component {
  render() {
    const { admin } = this.props
    return (
      <div>
        <div
          style={styles.container}
        >
          <Typography
            gutterBottom
            align="center"
            variant="h2"
          >
            About Me
          </Typography>
          {
            admin &&
            <Button
              variant="extendedFab"
              color="secondary"
            >
              Edit About
            </Button>
          }
        </div>
        <div
          style={styles.image}
        >
        </div>
        <div
          style={styles.container}
        >
          <Typography
            align="center"
          >
            {
              this.props.text
            }
          </Typography>
        </div>
      </div>
    )
  }
}
