import React from 'react'
import {
  Typography
} from '@material-ui/core'

const styles = {
  header: {
    marginTop: '3rem'
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

export default function About(props) {
  return (
    <div>
      <div
        style={styles.header}
      >
        <Typography
          align="center"
          variant="h2"
        >
          About Me
        </Typography>
      </div>
      <div
        style={styles.image}
      >
      </div>
    </div>
  )
}
