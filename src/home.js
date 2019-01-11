import React from 'react'
import {
  Typography,
  withStyles,
  Grid,
  Fab
} from '@material-ui/core'
import HomeAbout from './home-about'
import CategoryButton from './category-button'

const styles = {
  buttons: {
    borderRadius: '20%',
    overflow: 'hidden'
  },
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
  },
  fab: {
    width: 'fit-content',
    margin: '2rem auto'
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
    url: 'https://s3-us-west-1.amazonaws.com/spill-the-coco/image000000_02_2.jpg'
  },
  {
    title: 'Life',
    url: 'https://s3-us-west-1.amazonaws.com/spill-the-coco/image000001.jpg'
  },
  {
    title: 'Travel',
    url: 'https://s3-us-west-1.amazonaws.com/spill-the-coco/MVIMG_20180219_163502.jpg'
  }
]

export default function Home(props) {
  const { mobile, user } = props
  const admin = user && user.getId() === process.env.ADMIN_ID
  return (
    <div
      style={styles.container}
    >
      <DontSpill
        variant="h3"
      >
        Spill the Coco
      </DontSpill>
      {
        admin && <div
          style={styles.fab}
        >
          <Fab
            variant="extended"
            color="secondary"
            onClick={() => {
              location.hash = '#new'
            }}
          >
            <Typography
              variant="button"
            >
              Create new post!
            </Typography>
          </Fab>
        </div>
      }
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
          <div
            style={styles.buttons}
          >
            {
              categories.map((category, index) => {
                return (
                  <CategoryButton
                    key={index}
                    category={category}
                  />
                )
              })
            }
          </div>
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
