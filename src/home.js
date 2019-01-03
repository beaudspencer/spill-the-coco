import React from 'react'
import {
  Typography,
  withStyles
} from '@material-ui/core'

const DontSpill = withStyles({
  root: {
    fontFamily: 'Calligraffitti, cursive',
    marginTop: '3rem',
    textAlign: 'center'
  }
})(Typography)

export default class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <DontSpill
          variant="h1"
        >
          Spill the Coco
        </DontSpill>
      </React.Fragment>
    )
  }
}
