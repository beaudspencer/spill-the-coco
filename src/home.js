import React from 'react'
import {
  Typography,
  withStyles,
  Grid
} from '@material-ui/core'
import HomeAbout from './home-about'
import HomeCategory from './home-category'

const styles = {
  homeAbout: {
    width: '40%',
    padding: '1rem',
    maxWidth: '20rem',
    minWidth: '300px',
    float: 'right',
    marginTop: '3rem'
  },
  container: {
    margin: '0 auto',
    width: '80%',
    maxWidth: '80rem'
  },
  categories: {
    padding: '1rem',
    marginTop: '3rem',
    width: '60%',
    maxWidth: '60rem',
    minWidth: '300px'
  },
  divider: {
    borderLeftStyle: 'solid',
    borderLeftColor: '#e6e5a0',
    width: '4px',
    margin: '3rem 3rem 0 3rem',
    height: '26rem',
    padding: '0'
  }
}

const DontSpill = withStyles({
  root: {
    fontFamily: 'Calligraffitti, cursive',
    marginTop: '3rem',
    textAlign: 'center'
  }
})(Typography)

const categories = [
  {
    title: 'Food',
    url: 'https://cdn.cnn.com/cnnnext/dam/assets/170407220921-07-iconic-mountains-pitons-restricted.jpg'
  },
  {
    title: 'Life',
    url: 'https://cdn.cnn.com/cnnnext/dam/assets/170407220921-07-iconic-mountains-pitons-restricted.jpg'
  },
  {
    title: 'Travel',
    url: 'https://s3-us-west-1.amazonaws.com/spill-the-coco/MVIMG_20180219_163502.jpg'
  }
]

export default function Home(props) {
  const { mobile } = props
  return (
    <div
      style={styles.container}
    >
      <DontSpill
        variant="h3"
      >
        Spill the Coco
      </DontSpill>
      <Grid
        container
        spacing={32}
        justify="center"
        alignItems="center"
      >
        <Grid
          item
          style={styles.categories}
        >
          {
            categories.map((category, index) => {
              return (
                <HomeCategory
                  key={index}
                  category={category}
                />
              )
            })
          }
        </Grid>
        {
          !mobile && <Grid
            item
            style={styles.divider}
          >
          </Grid>
        }
        <Grid
          item
          style={styles.homeAbout}
        >
          <HomeAbout/>
        </Grid>
      </Grid>
    </div>
  )
}
