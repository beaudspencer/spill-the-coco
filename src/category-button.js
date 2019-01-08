import React from 'react'
import {
  withStyles,
  ButtonBase,
  Typography
} from '@material-ui/core'

const styles = theme => ({
  image: {
    position: 'relative',
    height: 180,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important',
      height: 100
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15
      },
      '& $imageMarked': {
        opacity: 0
      },
      '& $imageTitle': {
        border: '4px solid currentColor'
      }
    }
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%'
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity')
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity')
  }
})

class CategoryButton extends React.Component {
  render() {
    const { classes, category } = this.props
    return (
      <ButtonBase
        focusRipple
        onClick= {() => {
          location.hash = category.title.toLowerCase()
        }}
        className={classes.image}
        focusVisibleClassName={classes.focusVisible}
        style={{
          width: '100%'
        }}
      >
        <span
          className={classes.imageSrc}
          style={{
            backgroundImage: `url(${category.url})`,
            backgroundPosition: 'center'
          }}
        />
        <span className={classes.imageBackdrop} />
        <span className={classes.imageButton}>
          <Typography
            component="span"
            variant="subtitle1"
            color="inherit"
            className={classes.imageTitle}
          >
            {
              category.title
            }
            <span className={classes.imageMarked} />
          </Typography>
        </span>
      </ButtonBase>
    )
  }
}

export default withStyles(styles)(CategoryButton)
