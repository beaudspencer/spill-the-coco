import React, { Component } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography
} from '@material-ui/core'

export default class Home extends Component {
  render() {
    return (
      <AppBar
        color="Primary"
      >
        <Toolbar>
          <Typography
            variant="h4"
            color="inherit"
          >
            Spill The Coco
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}