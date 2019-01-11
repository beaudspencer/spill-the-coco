import React from 'react'
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Menu,
  MenuItem,
  CardActions,
  withStyles,
  Fab
} from '@material-ui/core'
import {
  Add
} from '@material-ui/icons'

const styles = {
  actions: {
    margin: '0.5rem auto'
  }
}

const GreenFab = withStyles({
  root: {
    backgroundColor: '#c4e6a0'
  }
})(Fab)

export default class PostCreator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      header: '',
      description: '',
      content: []
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  handleClick(event) {
    this.setState({
      anchorEl: event.currentTarget
    })
  }
  handleClose() {
    this.setState({
      anchorEl: null
    })
  }
  render() {
    const { header, description, anchorEl } = this.state
    return (
      <div>
        <Card>
          <CardContent>
            <TextField
              label="header"
              fullWidth
              value={header}
            />
            <TextField
              label="description"
              fullWidth
              value={description}
            />
          </CardContent>
          <CardActions>
            <div
              style={styles.actions}
            >
              <GreenFab
                aria-owns={anchorEl ? 'add-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <Add/>
              </GreenFab>
              <Menu
                id="add-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem>
                  <Typography
                    variant="h6"
                  >
                    Header
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <Typography
                    variant="h6"
                  >
                    Text
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <Typography
                    variant="h6"
                  >
                    Image
                  </Typography>
                </MenuItem>
              </Menu>
            </div>
          </CardActions>
        </Card>
      </div>
    )
  }
}
