import React from 'react'
import {
  Typography,
  withStyles
} from '@material-ui/core'
import HomeAbout from './home-about'

const styles = {
  homeAboutD: {
    width: '33%',
    float: 'right',
    marginTop: '3rem'
  },
  homeAboutM: {
    marginTop: '3rem'
  },
  container: {
    margin: '0 auto',
    width: '80%'
  }
}

const DontSpill = withStyles({
  root: {
    fontFamily: 'Calligraffitti, cursive',
    marginTop: '3rem',
    textAlign: 'center'
  }
})(Typography)

export default function Home(props) {
  const { mobile } = props
  return (
    <div
      style={styles.container}
    >
      <DontSpill
        variant="h1"
      >
        Spill the Coco
      </DontSpill>
      <div
        style={
          !mobile
            ? styles.homeAboutD
            : styles.homeAboutM
        }
      >
        <HomeAbout/>
      </div>
    </div>
  )
}
